import React, { Fragment, useEffect, useState } from "react";
import { ConfigProvider, DatePicker, DatePickerProps, GetProp, Image, message, Upload, UploadProps } from "antd";
import userIcon from "../../../assets/icons/default/user.svg";
import _ from "lodash";
import Input from "../../../modules/YaKIT.WEB.KIT/components/Input/Input";
import Select from "../../../modules/YaKIT.WEB.KIT/components/Select/Select";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import { requestGet, requestPost } from "../../../actions/actions";
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY";

const customFormatDate: DatePickerProps["format"] = (value) => {
  return dayjs(value).format(dateFormat);
};

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
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Изображение должно быть меньше 2МБ!");
  }

  return isJpgOrPng && isLt2M;
};

type Props = {
  setLoader: (loader: boolean) => void;
};

export default function ProfileUser({ setLoader }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // первоначалка
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    setLoader(true);

    let surveyData = await requestGet(`survey`);

    if (surveyData) {
      surveyData = addFirstValue(surveyData);

      if (surveyData.value.profilePhoto?.length) {
        setImageUrl(surveyData.value.profilePhoto);
      }
    }

    setSurveyData(surveyData);
    setLoader(false);
  };

  const addFirstValue = (surveyData: any) => {
    surveyData.data.forEach((item: any) => {
      if (item.answerType === "object" && surveyData.value[item.questionCode]) {
        let value: any = surveyData.objects?.[item.answersSpr]?.find(
          (f: any) => f.code === surveyData.value[item.questionCode]
        );
        item.value = value;
      } else if (item.answerType === "date" && surveyData.value[item.questionCode]) {
        item.value = dayjs(surveyData.value[item.questionCode]);
      } else {
        item.value = surveyData.value[item.questionCode];
      }
    });

    return surveyData;
  };

  const startEdit = () => {
    setIsEdit(true);
  };

  const declineEdit = () => {
    let newSurveyData: any = _.cloneDeep(surveyData);

    newSurveyData = addFirstValue(newSurveyData);

    setSurveyData(newSurveyData);
    setIsEdit(false);
  };

  // для изображения
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done" || info.file.status === "error") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // меняет input
  const changedString = (code: string, e: any) => {
    const newData: any = _.cloneDeep(surveyData);

    newData.data.find((f: any) => f.questionCode === code).value = e.target.value;

    setSurveyData(newData);
  };
  // меняет object
  const changedObject = (code: string, e: any) => {
    const newData: any = _.cloneDeep(surveyData);

    newData.data.find((f: any) => f.questionCode === code).value = e;

    setSurveyData(newData);
  };
  // меняет date
  const changedDate = (code: string, e: any) => {
    const newData: any = _.cloneDeep(surveyData);

    newData.data.find((f: any) => f.questionCode === code).value = e;

    setSurveyData(newData);
  };

  const sendSurvey = async () => {
    setLoader(true);

    const sendObj: any = {};

    surveyData.data.forEach((item: any) => {
      if (item.value) {
        if (item.answerType === "date") {
          sendObj[item.questionCode] = dayjs(item.value).format("YYYY-MM-DD");
        } else if (item.answerType === "object") {
          sendObj[item.questionCode] = item.value?.code;
        } else {
          sendObj[item.questionCode] = item.value;
        }
      }
    });

    if (imageUrl) {
      sendObj.profilePhoto = imageUrl;
    } else if (surveyData.value.profilePhoto?.length) {
      sendObj.profilePhoto = "";
    }

    const sendAnswer = await requestPost(`user/passSurvey`, sendObj);

    if (sendAnswer) {
      message.success("Успешно сохранено!");
    } else {
      message.error("Произошла ошибка, пожайлуста попробуйте позже или обратитесь к администратору");
    }

    getData();
    setIsEdit(false);
    setLoader(false);
  };

  return surveyData ? (
    <div className="profile-user">
      <div>
        {isEdit ? (
          imageUrl ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
              <Image
                className="profile-user-avatar-here"
                src={`${imageUrl}`}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  overflow: "hidden",
                  objectPosition: "top",
                }}
                preview={{
                  mask: <>Просмотр</>,
                }}
                fallback={userIcon}
              />
              <div
                className="profile-user-avatar-text"
                onClick={() => {
                  setImageUrl(undefined);
                }}
              >
                <DeleteOutlined /> Удалить
              </div>
            </div>
          ) : (
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, color: "#0A304B" }}>Загрузить</div>
              </button>
            </Upload>
          )
        ) : (
          <Image
            className={imageUrl?.length ? "profile-user-avatar-here" : "profile-user-avatar"}
            src={`${imageUrl}`}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              overflow: "hidden",
              objectPosition: "top",
            }}
            preview={{
              mask: <>Просмотр</>,
            }}
            fallback={userIcon}
          />
        )}
      </div>

      <div className="profile-user-items" style={!isEdit ? { gap: "16px" } : {}}>
        {surveyData.data
          ?.filter((f: any) => f.isVisible)
          .map((item: any) => {
            if (!isEdit) {
              return item.answerType === "string" || item.answerType === "phone" || item.answerType === "email" ? (
                <div className="profile-user-itemNoEdit" key={`profile-user-item-${item.questionCode}`}>
                  <div className="profile-user-item-text">{item.questionName}:</div>
                  <div className="profile-user-itemNoEdit-text">{item.value}</div>
                </div>
              ) : item.answerType === "object" ? (
                <div className="profile-user-itemNoEdit" key={`profile-user-item-${item.questionCode}`}>
                  <div className="profile-user-item-text">{item.questionName}:</div>
                  <div className="profile-user-itemNoEdit-text">{item.value?.name}</div>
                </div>
              ) : item.answerType === "date" ? (
                <div className="profile-user-itemNoEdit" key={`profile-user-item-${item.questionCode}`}>
                  <div className="profile-user-item-text">{item.questionName}:</div>
                  <div className="profile-user-itemNoEdit-text">
                    {item.value ? dayjs(item.value).format(dateFormat) : null}
                  </div>
                </div>
              ) : item.answerType !== "doc" ? (
                <div>{item.answerType}</div>
              ) : null;
            }

            return item.answerType === "string" || item.answerType === "phone" || item.answerType === "email" ? (
              <div className="profile-user-item" key={`profile-user-item-${item.questionCode}`}>
                <div className="profile-user-item-text">{item.questionName}:</div>
                <Input
                  value={item.value}
                  style={{ height: "30px" }}
                  onValueChanged={(e: any) => changedString(item.questionCode, e)}
                  type={item.answerType}
                />
              </div>
            ) : item.answerType === "object" ? (
              <div className="profile-user-item" key={`profile-user-item-${item.questionCode}`}>
                <div className="profile-user-item-text">{item.questionName}:</div>
                <Select
                  data={surveyData.objects[item.answersSpr]?.filter((f: any) => f.isVisible)}
                  value={item.value}
                  onValueChanged={(e: any) => changedObject(item.questionCode, e)}
                  dontShowClear
                  inputSize={"medium"}
                />
              </div>
            ) : item.answerType === "date" ? (
              <div className="profile-user-item" key={`profile-user-item-${item.questionCode}`}>
                <div className="profile-user-item-text">{item.questionName}:</div>
                <ConfigProvider locale={locale}>
                  <DatePicker
                    onChange={(value: any) => changedDate(item.questionCode, value)}
                    value={item.value ? item.value : null}
                    picker="date"
                    format={customFormatDate}
                    allowClear={false}
                  />
                </ConfigProvider>
              </div>
            ) : item.answerType !== "doc" ? (
              <div>{item.answerType}</div>
            ) : null;
          })}
      </div>

      <div />
      <div className="profile-user-footer">
        <div />
        {isEdit ? (
          <Fragment>
            <div className="profile-user-footer-button-decline" onClick={() => declineEdit()}>
              Отмена
            </div>
            <div className="profile-user-footer-button" onClick={() => sendSurvey()}>
              Сохранить
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div />
            <div className="profile-user-footer-button" onClick={() => startEdit()}>
              Редактировать
            </div>
          </Fragment>
        )}
      </div>
    </div>
  ) : null;
}
