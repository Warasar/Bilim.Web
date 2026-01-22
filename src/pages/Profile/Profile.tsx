import React, { useEffect, useState } from "react";
import _ from "lodash";
import ProfileUser from "../../components/Profile/ProfileItems/ProfileUser";
import { useSearchParams } from "react-router-dom";
import ProfileDocs from "../../components/Profile/ProfileItems/ProfileDocs";
import ProfileNotification from "../../components/Profile/ProfileItems/ProfileNotification";
import ProfileHomework from "../../components/Profile/ProfileItems/ProfileHomework";

type Props = {
  setLoader: (loader: boolean) => void;
  userData: any;
};

export default function Profile({ setLoader, userData }: Props) {
  const [searchParams] = useSearchParams();
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

  // когда меняется ссылка с searchParams
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleClickSider(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClickSider = (clickCode: any) => {
    const newSider: any = _.cloneDeep(sider);

    newSider.forEach((item: any) => {
      if (item.code === clickCode) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    setSider(newSider);

    // Добавляем code в URL
    const params = new URLSearchParams(window.location.search);
    params.set("code", clickCode);
    window.history.pushState({}, "", `${window.location.pathname}?${params}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-block">
        <div className="profile-sider">
          {sider.map((item: any) => {
            return (
              <div
                className={"profile-sider-item" + (item.active ? "-active" : "")}
                onClick={() => handleClickSider(item.code)}
              >
                <div className={`profile-sider-item-icon-${item.icon}`} />
                <div className={"profile-sider-item-text" + (item.active ? "-active" : "")}>{item.name}</div>
              </div>
            );
          })}
        </div>

        {sider?.find((f: any) => f.active === true)?.code === "profile" ? (
          <ProfileUser setLoader={setLoader} />
        ) : sider?.find((f: any) => f.active === true)?.code === "docs" ? (
          <ProfileDocs setLoader={setLoader} />
        ) : sider?.find((f: any) => f.active === true)?.code === "notification" ? (
          <ProfileNotification setLoader={setLoader} />
        ) : sider?.find((f: any) => f.active === true)?.code === "homework" ? (
          <ProfileHomework setLoader={setLoader} />
        ) : null}
      </div>
    </div>
  );
}
