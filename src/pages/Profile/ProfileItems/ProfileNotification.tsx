import React, { useEffect, useState } from "react";
import { requestGet, requestPatch } from "../../../actions/actions";
import dayjs from "dayjs";
import _ from "lodash";
import Checkbox from "../../../modules/YaKIT.WEB.KIT/components/Checkbox/Checkbox";

dayjs.locale("ru");
const dateFormat = "DD MMMM YYYY HH:mm";

export type INotification = {
  createdWhen: string;
  description: string;
  forAdmins: boolean;
  forParents: boolean;
  forStudents: boolean;
  id: number;
  isRead: boolean;
  textHtml: string | null;
  title: string;
};

type Props = {
  setLoader: (loader: boolean) => void;
};

export default function ProfileNotification({ setLoader }: Props) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotification = async () => {
    setLoader(true);

    const notifications: INotification[] = await requestGet(`user/notifications`);

    if (notifications) {
      setNotifications(notifications);
    }

    setLoader(false);
  };

  const changeRead = (item: INotification) => {
    const newNotification: INotification[] = _.cloneDeep(notifications);

    newNotification.find((f) => f.id === item.id)!.isRead = !item.isRead;

    try {
      requestPatch(`user/notifications/${item.id}?read=${!item.isRead}`);
    } catch {
      console.log("Ошибка в requestPatch");
    }

    setNotifications(newNotification);
  };

  return (
    <div className="profile-notification">
      {notifications.map((item) => {
        return (
          <div
            className={"profile-notification-item" + (item.isRead ? " profile-notification-item-readed" : "")}
            key={`profile-notification-item-${item.id}`}
          >
            <div className="profile-notification-item-flexColumn">
              <div className="profile-notification-item-title">{item.title}</div>
              <div className="profile-notification-item-description">{item.description}</div>
              {item.textHtml?.length ? (
                <div className="profile-notification-item-html" dangerouslySetInnerHTML={{ __html: item.textHtml }} />
              ) : null}
              <div className="profile-notification-item-date">
                <span className="profile-notification-item-description">Дата создания:</span>{" "}
                {dayjs(item.createdWhen).format(dateFormat)}
              </div>
            </div>
            <div title={`Пометить ${item.isRead ? "не " : ""}прочитанным`}>
              <Checkbox checked={item.isRead} onChange={() => changeRead(item)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
