import React, { useEffect, useState } from "react";
import "./profile.scss";
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
import HeaderContainer from "../Header/HeaderContainer";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY"; // "7 августа 2000"

export default function Profile() {
  const [loader, setLoader] = useState<boolean>(true);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [terms, setTerms] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const customFormatDate: DatePickerProps["format"] = (value) => {
    return dayjs(value).format(dateFormat);
  };

  // первоначалка
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const currentUser = await requestGet(`currentUser`);

    setCurrentUser(currentUser);
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

    newData.data.find((f: any) => f.questionCode === code).value = e.target.value;

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
      message.error("Произошла ошибка, пожайлуста попробуйте позже или обратитесь к администратору");
    }

    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}
      <HeaderContainer />

      <div className="profile">
        <div className="profile-container">
          <div className="profile-title">Профиль</div>

          <div className="profile-user">
            <div className="profile-user-avatar">avatar aang</div>

            <div className="profile-user-items">
              <div className="profile-user-item">
                <div className="profile-user-item-text">Имя:</div>
              </div>
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
              <div className="survey-modal-footer-button" onClick={() => acceptTerms()}>
                Принять
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
