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
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

  const currentUser = useCurrentUser(true);

  // первоначалка
  useEffect(() => {
    if (currentUser) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const getData = async () => {
    if (currentUser && !currentUser.hasAcceptedTerms) {
      const terms = await requestGet(`terms/3`);

      setTerms(terms);
      setShowTermsModal(true);
    }

    const surveyData = await requestGet(`survey`);
    if (surveyData) {
      setData(surveyData);
    }

    setLoader(false);
  };

  // принимает пользовательское соглашение
  const acceptTerms = async () => {
    setLoader(true);

    const accept = await requestPost(`user/acceptTerms`, {});

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

    const sendAnswer = await requestPost(`user/passSurvey`, sendObj);

    if (sendAnswer) {
      message.success("Успешно сохранено!");

      setTimeout(() => {
        const win: Window = window;
        win.location = `${window.location.origin}/accompaniment`;
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
                  // className="survey-input"
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
                  // className="survey-select"
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
                    className="survey-datepicker"
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
              <div className="survey-unknown-type">{item.answerType}</div>
            );
          })}
        </div>

        <div className="survey-modal-footer">
          <div />
          <button className="survey-submit-button" onClick={() => sendSurvey()}>
            Отправить
          </button>
        </div>
      </div>

      {/* пользовательское соглашение */}
      <Modal open={showTermsModal} onCancel={() => {}} width="90vw">
        <div className="survey-modal">
          <div className="survey-modal-header">
            <div className="survey-modal-header-text">Условия пользования</div>
          </div>
          <div className="survey-modal-content">
            <div className="survey-modal-acceptTerms">
              <div
                className="survey-modal-acceptTerms-text"
                dangerouslySetInnerHTML={{ __html: terms?.items?.data }}
              />
            </div>
          </div>
          <div className="survey-modal-footer">
            <div />
            <button
              className="survey-accept-button"
              onClick={() => acceptTerms()}
            >
              Принять
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
