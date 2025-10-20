import React, { useEffect, useState } from "react";
import "./profile.scss";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { requestGet } from "../../actions/actions";
import dayjs from "dayjs";
import HeaderContainer from "../Header/HeaderContainer";
import { Image } from "antd";
import userIcon from "../../assets/icons/default/user.svg";

dayjs.locale("ru");

export default function Profile() {
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [sider, setSider] = useState<any>([
    {
      code: "0",
      name: "Профиль",
      icon: "profile",
      active: true,
    },
    {
      code: "1",
      name: "Документы",
      icon: "docs",
      active: false,
    },
    {
      code: "2",
      name: "Уведомления",
      icon: "notification",
      active: false,
    },
    {
      code: "3",
      name: "Домашние задания",
      icon: "homework",
      active: false,
    },
  ]);

  // первоначалка
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const newData: any = await requestGet(`container/user`);

    setData(newData);
    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}
      <HeaderContainer />

      <div className="profile">
        {data ? (
          <div className="profile-container">
            <div className="profile-block">
              <div className="profile-sider">
                {sider.map((item: any) => {
                  return (
                    <div className={"profile-sider-item" + (item.active ? "-active" : "")}>
                      <div className={`profile-sider-item-icon-${item.icon}`} />
                      <div className={"profile-sider-item-text" + (item.active ? "-active" : "")}>{item.name}</div>
                    </div>
                  );
                })}
              </div>
              <div className="profile-user">
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

                <div className="profile-user-items">
                  <div className="profile-user-item">
                    <div className="profile-user-item-text profile-user-item-text-bold">ФИО:</div>
                    <div className="profile-user-item-text">{data.fullName}</div>
                  </div>

                  <div className="profile-user-item">
                    <div className="profile-user-item-text profile-user-item-text-bold">Email:</div>
                    <div className="profile-user-item-text">{data.mail}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
