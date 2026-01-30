import React, { Fragment, useEffect, useState } from "react";
import { requestGet, requestGetResponse, requestPost } from "../../../actions/actions";
import dayjs from "dayjs";
import { message, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import _ from "lodash";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY";

type Props = {
  setLoader: (loader: boolean) => void;
};

export default function ProfileDocs({ setLoader }: Props) {
  const [docsList, setDocsList] = useState<any>(null);

  useEffect(() => {
    getDocsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocsList = async () => {
    setLoader(true);

    const docsList: any = await requestGet(`document/list`);

    if (docsList) {
      setDocsList(docsList);
    }

    setLoader(false);
  };

  const downloadFile = async (code: string) => {
    setLoader(true);

    try {
      const response = await requestGetResponse(`document/download/${code}`, {
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
          fileName = `document-${code}`;
        }

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

  const beforeUpload = (file: any, code: string) => {
    if (file) {
      const newDocList: any = _.cloneDeep(docsList);

      newDocList.find((f: any) => f.code === code).sendFile = file;

      setDocsList(newDocList);
    }

    return false;
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

    setDocsList(null);

    setTimeout(() => {
      getDocsList();
    }, 50);
  };

  return (
    <div className="profile-docs">
      {docsList
        ?.filter((f: any) => f.isVisible)
        ?.map((item: any) => (
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
                <div className="profile-docs-flex">
                  <div className="profile-docs-doc1" onClick={() => downloadFile(item.code)}>
                    <DownloadOutlined />
                    Скачать файл
                  </div>

                  <Upload
                    className="profile-docs-upload"
                    name="file"
                    showUploadList={true}
                    beforeUpload={(e: any) => beforeUpload(e, item.code)}
                    maxCount={1}
                  >
                    <div className="profile-docs-doc">
                      <UploadOutlined />
                      Изменить файл
                    </div>
                  </Upload>
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
                  <UploadOutlined />
                  Загрузить файл
                </div>
              </Upload>
            )}
          </div>
        ))}

      {docsList?.filter((f: any) => f.isVisible)?.length ? (
        <div className="profile-user-footer">
          <div />
          <Fragment>
            <div className="profile-user-footer-button" onClick={() => send()}>
              Сохранить
            </div>
          </Fragment>
        </div>
      ) : null}
    </div>
  );
}
