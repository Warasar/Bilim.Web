import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useEditableCell } from "./UseEditableCell";
import { Upload, GetProp, UploadProps, message, Image, Button } from "antd";
import Loader from "../../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import emptyPic from "../../../assets/icons/default/emptyPic.png";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("Вы можете загрузить только формат JPG/PNG!");
  }
  const isLt4M = file.size / 1024 / 1024 < 4;
  if (!isLt4M) {
    message.error("Изображение должно быть меньше 4МБ!");
  }

  return isJpgOrPng && isLt4M;
};

export const EditableImageCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { value: cellValue, inputRef, handleChange } = useEditableCell(value, record, col, onSave);

  // для изображения
  const handleChangeImage: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done" || info.file.status === "error") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        handleChange(url);
        onSave(url, record, col);
      });
    }
  };

  return (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      {loading ? <Loader absolute /> : null}

      <div
        style={{ display: "grid", gap: "6px", alignItems: "center", gridTemplateColumns: "1fr auto", width: "100%" }}
      >
        <div>
          <Image
            className="profile-table-cell-img"
            src={`${cellValue}`}
            style={{
              objectFit: "cover",
              overflow: "hidden",
              objectPosition: "top",
            }}
            preview={{
              mask: <>Просмотр</>,
            }}
            fallback={emptyPic}
          />
        </div>
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChangeImage}
          ref={inputRef}
          disabled={!col.isEdit}
        >
          <Button type="text" icon={<EditOutlined />} size="small" title="Редактировать" />
        </Upload>
      </div>
    </div>
  );
};
