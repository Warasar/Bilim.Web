import React, { useEffect, useState } from "react";
import _ from "lodash";
import { requestGet } from "../../actions/actions";
import ProfileTable from "./ProfileItems/ProfileTable";

type Props = {
  setLoader: (loader: boolean) => void;
  loader: boolean;
};

export default function ProfileAdmin({ setLoader, loader }: Props) {
  const [sider, setSider] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  // первоначалка
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/tables`);

    const newSider: any = [];
    const newGroups: any = [];

    const params = new URLSearchParams(window.location.search);
    let searchId: any = null;

    if (params.get("id")) {
      searchId = params.get("id");
    }

    table.tables?.forEach((item: any, index: number) => {
      if (item.isVisible) {
        if (searchId) {
          newSider.push({
            isTable: true,
            active: searchId + "" === item.id + "",
            ...item,
          });
        } else {
          newSider.push({
            isTable: true,
            active: index ? false : true,
            ...item,
          });
        }
      }
    });

    table?.groups?.forEach((item: any) => {
      if (item.isVisible) {
        newGroups.push({
          opened: true,
          ...item,
        });
      }
    });

    setGroups(newGroups);
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

    // Добавляем id в URL
    const params = new URLSearchParams(window.location.search);
    params.set("id", clickId);
    window.history.pushState({}, "", `${window.location.pathname}?${params}`);
  };

  const handleClickGroup = (clickedCode: string) => {
    const newGroups: any = _.cloneDeep(groups);

    newGroups?.forEach((item: any) => {
      if (item.code === clickedCode) {
        item.opened = !item.opened;
      }
    });

    setGroups(newGroups);
  };

  return (
    <div className="profile-admin">
      <div className="profile-block" style={{ gap: "12px" }}>
        <div className="profile-siderAdmin">
          {groups?.map((group: any) => {
            return (
              <div key={`group-${group.code}`}>
                <div className="profile-siderAdmin-group" key={`profile-siderAdmin-group_${group.code}`}>
                  <div className="profile-siderAdmin-group-text">{group.name}</div>
                  <div
                    className={"profile-siderAdmin-group-arrow" + (group.opened ? "-active" : "")}
                    onClick={() => {
                      handleClickGroup(group.code);
                    }}
                  />
                </div>
                {group.opened ? (
                  <div className="profile-siderAdmin-items">
                    {sider
                      ?.filter((f: any) => f.group === group.code)
                      ?.map((item: any) => {
                        return (
                          <div
                            key={`sider-item-${item.id}`}
                            className={"profile-siderAdmin-item" + (item.active ? "-active" : "")}
                            onClick={() => handleClickSider(item.id)}
                          >
                            <div className={"profile-siderAdmin-item-text" + (item.active ? "-active" : "")}>
                              {item.tableTitle}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {sider?.find((f: any) => f.active)?.isTable ? (
          <ProfileTable setLoader={setLoader} tableItem={sider.find((f: any) => f.active)} loader={loader} />
        ) : null}
      </div>
    </div>
  );
}
