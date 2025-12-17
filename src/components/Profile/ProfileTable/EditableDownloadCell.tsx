import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { requestGetResponse } from "../../../actions/actions";

export const EditableDownloadCell: React.FC<{
  value: any;
  record: any;
  col: any;
  setLoader: (loader: boolean) => void;
}> = ({ value, record, col, setLoader }) => {
  const downloadFile = async () => {
    setLoader(true);

    try {
      const response = await requestGetResponse(`/admin/downloadFile?filePath=${value}`, {
        responseType: "arraybuffer",
      });

      if (response) {
        const fileData = response.data;
        const contentType = response.headers?.["content-type"] || "application/pdf";
        let fileName = response.headers?.["content-disposition"].split("filename=")[1]?.split(";")[0]?.trim();
        if (fileName && fileName.startsWith('"') && fileName.endsWith('"')) {
          fileName = fileName.slice(1, -1);
        }

        if (!fileName) {
          fileName = `${record[col.code]}`;
        }

        debugger;

        const blob = new Blob([fileData], { type: contentType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      <div className="profile-table-cell-download" onClick={() => downloadFile()}>
        <DownloadOutlined />
        Скачать файл
      </div>
    </div>
  );
};
