import React, { useEffect, useState } from "react";
import _ from "lodash";
import ProfileUser from "./ProfileItems/ProfileUser";
import { useSearchParams } from "react-router-dom";
import ProfileDocs from "./ProfileItems/ProfileDocs";

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
          <ProfileDocs userData={userData} setLoader={setLoader} />
        ) : null}
      </div>
    </div>
  );
}
