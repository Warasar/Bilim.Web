import React, { Fragment, useEffect, useState } from "react";
import { ConfigProvider, DatePicker, DatePickerProps, Image, message } from "antd";
import userIcon from "../../../assets/icons/default/user.svg";
import _ from "lodash";
import Input from "../../../modules/YaKIT.WEB.KIT/components/Input/Input";
import Select from "../../../modules/YaKIT.WEB.KIT/components/Select/Select";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import { requestGet, requestPost } from "../../../actions/actions";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY";

const customFormatDate: DatePickerProps["format"] = (value) => {
  return dayjs(value).format(dateFormat);
};

type Props = {
  setLoader: (loader: boolean) => void;
};

export default function ProfileUser({ setLoader }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<any>(null);

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
        <Image
          className="profile-user-avatar"
          // src={`${item.urlImg}`}
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
      </div>

      <div className="profile-user-items" style={!isEdit ? { gap: "16px" } : {}}>
        {surveyData.data.map((item: any) => {
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
                data={surveyData.objects[item.answersSpr]}
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
