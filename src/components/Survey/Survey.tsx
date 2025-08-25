import React, { useEffect, useState } from "react";
import "./survey.scss";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import Modal from "../../modules/YaKIT.WEB.KIT/components/Modal/Modal";
import { requestGet, requestPost } from "../../actions/actions";
import { DatePickerProps, message } from "antd";
import Input from "../../modules/YaKIT.WEB.KIT/components/Input/Input";
import _ from "lodash";
import Select from "../../modules/YaKIT.WEB.KIT/components/Select/Select";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY"; // "7 августа 2000"

export default function Survey() {
  const [loader, setLoader] = useState<boolean>(true);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [terms, setTerms] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const customFormatDate: DatePickerProps["format"] = (value) => {
    return dayjs(value).format(dateFormat);
  };

  // первоначалка
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const currentUser = await requestGet(`currentUser`);

    if (!currentUser.hasAcceptedTerms) {
      const terms = await requestGet(`container/terms`);

      setTerms(terms);
      setShowTermsModal(true);
    }

    const surveyData = await requestGet(`register/survey/${currentUser.role}`);
    if (surveyData) {
      setData(surveyData);
    }

    setLoader(false);
  };

  // принимает пользовательское соглашение
  const acceptTerms = async () => {
    setLoader(true);

    const accept = await requestPost(`register/acceptTerms`, {});

    if (accept) {
      message.success(accept);
      setShowTermsModal(false);
    }

    setLoader(false);
  };

  // меняет input
  const changedString = (code: string, e: any) => {
    const newData: any = _.cloneDeep(data);

    newData.data.find((f: any) => f.questionCode === code).value =
      e.target.value;

    setData(newData);
  };

  // меняет object
  const changedObject = (code: string, e: any) => {
    const newData: any = _.cloneDeep(data);

    newData.data.find((f: any) => f.questionCode === code).value = e;

    setData(newData);
  };

  // меняет date
  const changedDate = (code: string, e: any) => {
    const newData: any = _.cloneDeep(data);

    newData.data.find((f: any) => f.questionCode === code).value = e;

    setData(newData);
  };

  const sendSurvey = async () => {
    setLoader(true);

    const sendObj: any = {};

    data.data.forEach((item: any) => {
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

    const sendAnswer = await requestPost(`register/passSurvey`, sendObj);

    if (sendAnswer) {
      message.success("Успешно сохранено!");

      setTimeout(() => {
        const win: Window = window;
        win.location = `${window.location.origin}`;
      }, 2000);
    } else {
      message.error(
        "Произошла ошибка, пожайлуста попробуйте позже или обратитесь к администратору"
      );
    }

    setLoader(false);
  };

  return (
    <div className="survey">
      {loader ? <Loader absolute /> : null}
      <div className="survey-container">
        <div className="survey-title">Анкета пользователя</div>

        <div className="survey-items">
          {data?.data?.map((item: any) => {
            return item.answerType === "string" ||
              item.answerType === "phone" ||
              item.answerType === "email" ? (
              <div
                className="survey-item"
                key={`survey-item-${item.questionCode}`}
              >
                <div className="survey-item-text">{item.questionName}:</div>
                <Input
                  value={item.value}
                  style={{ height: "30px" }}
                  onValueChanged={(e: any) =>
                    changedString(item.questionCode, e)
                  }
                  type={item.answerType}
                />
              </div>
            ) : item.answerType === "object" ? (
              <div
                className="survey-item"
                key={`survey-item-${item.questionCode}`}
              >
                <div className="survey-item-text">{item.questionName}:</div>
                <Select
                  data={data.objects[item.answersSpr]}
                  value={item.value}
                  onValueChanged={(e: any) =>
                    changedObject(item.questionCode, e)
                  }
                  dontShowClear
                />
              </div>
            ) : item.answerType === "date" ? (
              <div
                className="survey-item"
                key={`survey-item-${item.questionCode}`}
              >
                <div className="survey-item-text">{item.questionName}:</div>
                <ConfigProvider locale={locale}>
                  <DatePicker
                    onChange={(value: any) =>
                      changedDate(item.questionCode, value)
                    }
                    value={item.value ? item.value : null}
                    picker="date"
                    format={customFormatDate}
                    allowClear={false}
                  />
                </ConfigProvider>
              </div>
            ) : (
              <div>{item.answerType}</div>
            );
          })}
        </div>

        <div className="survey-modal-footer">
          <div />
          <div
            className="survey-modal-footer-button"
            onClick={() => sendSurvey()}
          >
            Отправить
          </div>
        </div>
      </div>

      {/* пользовательское соглашение */}
      <Modal open={showTermsModal} onCancel={() => {}}>
        <div className="survey-modal">
          <div className="survey-modal-header">
            <div className="survey-modal-header-text">Условия пользования</div>
          </div>
          <div className="survey-modal-acceptTerms">
            <div className="survey-modal-acceptTerms-text">{terms?.text1}</div>
            <div className="survey-modal-acceptTerms-text">{terms?.text2}</div>
            <div className="survey-modal-acceptTerms-text">{terms?.text3}</div>
          </div>
          <div className="survey-modal-footer">
            <div />
            <div
              className="survey-modal-footer-button"
              onClick={() => acceptTerms()}
            >
              Принять
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
