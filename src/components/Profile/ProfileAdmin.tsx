import React, { useEffect, useState } from "react";
import _ from "lodash";
import { requestGet } from "../../actions/actions";
import ProfileTable from "./ProfileItems/ProfileTable";

type Props = {
  setLoader: (loader: boolean) => void;
};

export default function ProfileAdmin({ setLoader }: Props) {
  const [sider, setSider] = useState<any[]>([]);

  // первоначалка
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/tables`);

    const newSider: any = [];

    table.forEach((item: any, index: number) => {
      if (item.isVisible) {
        newSider.push({
          isTable: true,
          active: index ? false : true,
          ...item,
        });
      }
    });

    setSider(newSider);
    setLoader(false);
  };

  const handleClickSider = (clickId: any) => {
    const newSider: any = _.cloneDeep(sider);

    newSider?.forEach((item: any) => {
      if (item.id === clickId) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    setSider(newSider);
  };

  return (
    <div className="profile-container">
      <div className="profile-block" style={{ gap: "12px" }}>
        <div className="profile-siderAdmin">
          {sider.map((item: any) => {
            return (
              <div
                className={"profile-siderAdmin-item" + (item.active ? "-active" : "")}
                onClick={() => handleClickSider(item.id)}
              >
                <div className={"profile-siderAdmin-item-text" + (item.active ? "-active" : "")}>{item.tableTitle}</div>
              </div>
            );
          })}
        </div>

        {sider.find((f: any) => f.active)?.isTable ? (
          <ProfileTable setLoader={setLoader} tableItem={sider.find((f: any) => f.active)} />
        ) : null}
      </div>
    </div>
  );
}
