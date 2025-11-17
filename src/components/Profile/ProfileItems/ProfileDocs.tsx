import React, { Fragment, useEffect, useState } from "react";
import { requestGet, requestGetResponse, requestPost } from "../../../actions/actions";
import dayjs from "dayjs";
import { Button, message, Upload, UploadProps } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import _ from "lodash";
import axios from "axios";
import cookie from "js-cookie";
import { url } from "../../../constants/constants";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY";

type Props = {
  userData: any;
  setLoader: (loader: boolean) => void;
};

export default function ProfileDocs({ userData, setLoader }: Props) {
  const [docsList, setDocsList] = useState<any>(null);
  const [docsListPrimary, setDocsListPrimary] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    getDocsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocsList = async () => {
    setLoader(true);

    const docsList: any = await requestGet(`document/list`);

    if (docsList) {
      setDocsList(docsList);
      setDocsListPrimary(docsList);
    }

    setLoader(false);
  };

  const downloadFile = async (code: string) => {
    setLoader(true);

    try {
      const response = await requestGetResponse(`document/download/${code}`);

      if (response) {
        const fileData = response.data || response;
        const contentType = response.headers["content-type"] || "application/octet-stream";
        const fileName =
          response.headers["content-disposition"]?.split(";")?.[1]?.replace("filename=", "")?.trim() ||
          `document-${code}`;

        const blob = new Blob([fileData], { type: contentType });
        const urlHref = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = urlHref;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const beforeUpload = (file: any, code: string) => {
    if (file) {
      const newDocList: any = _.cloneDeep(docsList);

      newDocList.find((f: any) => f.code === code).sendFile = file;

      setDocsList(newDocList);

      setIsEdit(true);
    }

    return false;
  };

  const decline = () => {
    setDocsList(docsListPrimary);
    setIsEdit(false);
  };

  const send = async () => {
    setLoader(true);

    for (let i = 0; i < docsList.length; i++) {
      if (docsList[i].sendFile) {
        const formData = new FormData();
        formData.append("file", docsList[i].sendFile);

        const sendAnswer = await requestPost(`document/upload/${docsList[i].code}`, formData);

        if (sendAnswer) {
          message.success(`${docsList[i].title}: успешно сохранено!`);
        } else {
          message.error(`Произошла ошибка при загрузке ${docsList[i].title}`);
        }
      }
    }

    getDocsList();
    setIsEdit(false);
    setLoader(false);
  };

  return (
    <div className="profile-docs">
      {docsList?.map((item: any) => {
        return item.isVisible ? (
          <div className="profile-docs-flexColumn">
            <div className="profile-docs-item" key={`profile-docs-item-${item.code}`}>
              <div className="profile-docs-item-text">{item.title}:</div>
              <div className="profile-docs-item-html" dangerouslySetInnerHTML={{ __html: item.textHtml }} />
            </div>

            {item.loadedFile ? (
              <Fragment>
                <div className="profile-docs-time">
                  Добавлен: {dayjs(item.loadedFile.loadedWhen).format(dateFormat)}
                </div>
                <div className="profile-docs-doc" onClick={() => downloadFile(item.code)}>
                  <DownloadOutlined />
                  Скачать файл
                </div>
              </Fragment>
            ) : (
              <Upload
                className="profile-docs-upload"
                name="file"
                showUploadList={true}
                beforeUpload={(e: any) => beforeUpload(e, item.code)}
                maxCount={1}
              >
                <div className="profile-docs-doc">
                  <DownloadOutlined />
                  Загрузить файл
                </div>
              </Upload>
            )}
          </div>
        ) : null;
      })}

      <div className="profile-user-footer">
        <div />
        <Fragment>
          <div className="profile-user-footer-button-decline" onClick={() => decline()}>
            Отмена
          </div>
          <div className="profile-user-footer-button" onClick={() => send()}>
            Сохранить
          </div>
        </Fragment>
      </div>
    </div>
  );
}
