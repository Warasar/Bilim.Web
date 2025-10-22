import React, { Fragment, useState } from "react";
import { ConfigProvider, DatePicker, DatePickerProps, Image, message } from "antd";
import userIcon from "../../../assets/icons/default/user.svg";
import _ from "lodash";
import Input from "../../../modules/YaKIT.WEB.KIT/components/Input/Input";
import Select from "../../../modules/YaKIT.WEB.KIT/components/Select/Select";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import { requestPost } from "../../../actions/actions";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY";

const customFormatDate: DatePickerProps["format"] = (value) => {
  return dayjs(value).format(dateFormat);
};

type Props = {
  userData: any;
  setLoader: (loader: boolean) => void;
};

export default function ProfileDocs({ userData, setLoader }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="profile-docs">
      <div className="profile-docs-item">
        <div className="profile-docs-item-text">Паспорт:</div>
      </div>
    </div>
  );
}
