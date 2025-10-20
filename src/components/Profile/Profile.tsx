import React, { useEffect, useState } from "react";
import "./profile.scss";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { requestGet } from "../../actions/actions";
import dayjs from "dayjs";
import HeaderContainer from "../Header/HeaderContainer";
import { Image } from "antd";
import userIcon from "../../assets/icons/default/user.svg";
import _ from "lodash";

dayjs.locale("ru");

export default function Profile() {
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [sider, setSider] = useState<any>([
    {
      code: "profile",
      name: "Профиль",
      icon: "profile",
      active: true,
    },
    {
      code: "docs",
      name: "Документы",
      icon: "docs",
      active: false,
    },
    {
      code: "notification",
      name: "Уведомления",
      icon: "notification",
      active: false,
    },
    {
      code: "homework",
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
    const currentUser = await requestGet(`currentUser`);

    const surveyData = await requestGet(`register/survey/${currentUser.role}`);
    if (surveyData) {
      debugger;
      // setData(surveyData);
    }

    setData(newData);
    setLoader(false);
  };

  const handleClickSider = (clickItem: any) => {
    const newSider: any = _.cloneDeep(sider);

    newSider.forEach((item: any) => {
      if (item.code === clickItem.code) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    setSider(newSider);
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
                    <div
                      className={
                        "profile-sider-item" + (item.active ? "-active" : "")
                      }
                      onClick={() => handleClickSider(item)}
                    >
                      <div className={`profile-sider-item-icon-${item.icon}`} />
                      <div
                        className={
                          "profile-sider-item-text" +
                          (item.active ? "-active" : "")
                        }
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {sider?.find((f: any) => f.active === true)?.code ===
              "profile" ? (
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

                  <div className="profile-user-items">
                    <div className="profile-user-item">
                      <div className="profile-user-item-text profile-user-item-text-bold">
                        ФИО:
                      </div>
                      <div className="profile-user-item-text">
                        {data.fullName}
                      </div>
                    </div>

                    <div className="profile-user-item">
                      <div className="profile-user-item-text profile-user-item-text-bold">
                        Email:
                      </div>
                      <div className="profile-user-item-text">{data.mail}</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
