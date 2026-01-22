import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cookie from "js-cookie";
import { INotification } from "../Profile/ProfileItems/ProfileNotification";
import { requestGet } from "../../actions/actions";
import { DocsIcon, ExitIcon, HomeworkIcon, NotificationIcon, TableIcon, UserIcon, VideoIcon } from "../Icons/Icons";
import { NavlinkButton } from "../../types/header";

export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

const NavlinkButtons: NavlinkButton[] = [
  {
    link: "/profile?code=profile",
    icon: <UserIcon className="header-popover-items-item-icon" />,
    text: "Мой профиль",
  },
  {
    link: "/profile?code=docs",
    icon: <DocsIcon />,
    text: "Документы",
  },
  {
    link: "/profile?code=notification",
    icon: <NotificationIcon className="header-popover-items-item-icon" />,
    text: "Уведомления",
  },
  {
    link: "/profile?code=homework",
    icon: <HomeworkIcon />,
    text: "Домашние задания",
  },
  {
    link: "/videos",
    icon: <VideoIcon className="header-popover-items-item-icon" />,
    text: "Записи встреч",
  },
];
const TableButton: NavlinkButton = {
  link: "/profile",
  icon: <TableIcon />,
  text: "Таблицы",
};

type Props = {
  data: any;
  whiteBg: boolean | undefined;
};

export default function Header({ data, whiteBg }: Props) {
  const [isScrolled, setIsScrolled] = useState<boolean>(whiteBg ? true : false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const headerClassName = !isScrolled ? "header" : "header-scrolled";
  const location = useLocation();
  const popoverRef = useClickOutside(() => setShowPopover(false));

  useEffect(() => {
    getNotification();
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      document.querySelectorAll(`[id*="vuz_"]`).forEach((element: any) => {
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition + 100 >= offsetTop && scrollPosition + 100 < offsetTop + offsetHeight) {
            setActiveSection(element.id);
          } else if (scrollPosition < 100) {
            setActiveSection(null);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getNotification = async () => {
    const notifications: INotification[] = await requestGet(`user/notifications`);

    if (notifications) {
      setNotifications(notifications);
    }
  };

  const clickUser = () => {
    setShowPopover(!showPopover);
  };

  const clickScrollIntoDiv = (id: any) => {
    if (id === "vuz") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  const scrollButtons = useMemo(() => {
    return data.buttons.map((item: any) => {
      if (item.scroll) {
        const key = `${headerClassName}-${item.link}`;

        if (!activeSection && item.link === "vuz") {
          return (
            <NavLink
              to={`/${item.link}`}
              key={`nav-${key}`}
              className={`${headerClassName}-flex-item${location.pathname === `/${item.link}` ? "-active" : ""}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // для плавной прокрутки
                });
              }}
            >
              {item.name}
            </NavLink>
          );
        }

        return (
          <div
            key={`div-${key}`}
            className={`${headerClassName}-flex-item${activeSection === item.link ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv(item.link)}
          >
            {item.name}
          </div>
        );
      }

      return (
        <NavLink
          key={`${headerClassName}-flex-item_${item.link}`}
          to={`/${item.link}`}
          className={`${headerClassName}-flex-item${location.pathname === `/${item.link}` ? "-active" : ""}`}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth", // для плавной прокрутки
            })
          }
        >
          {item.name}
        </NavLink>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.buttons, activeSection, location.pathname, isScrolled]);

  const renderNavlinkButton = (item: NavlinkButton) => {
    return (
      <NavLink className="header-popover-items-item" key={`header-popover-items-item_${item.text}`} to={item.link}>
        {item.icon}
        <div className="header-popover-items-item-text">{item.text}</div>
      </NavLink>
    );
  };

  return (
    <div className={`${headerClassName}-bg`}>
      <div className={`${headerClassName}`}>
        {/* лого  */}
        <NavLink
          to={"/accompaniment"}
          className={`${headerClassName}-logo`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth", // для плавной прокрутки
            });
          }}
        />

        {/* кнопки */}
        <div className={`${headerClassName}-flex`}>{scrollButtons}</div>

        {/* связаться и пользователь */}
        <div className={`${headerClassName}-flex`}>
          {data.phoneLink.url?.length && (
            <a className={`${headerClassName}-button`} href={data.phoneLink.url} target="_blank" rel="noreferrer">
              <div className={`${headerClassName}-button-mail`} />
              Связаться
            </a>
          )}

          <div className={`header-popoverParent`} ref={popoverRef}>
            <div className={`${headerClassName}-relative`}>
              {data.user.profilePhoto?.length ? (
                <img
                  src={data.user.profilePhoto}
                  alt=""
                  className={`${headerClassName}-userImg`}
                  onClick={() => clickUser()}
                />
              ) : (
                <div className={`${headerClassName}-user`} onClick={() => clickUser()} />
              )}

              {notifications.filter((f) => !f.isRead).length ? (
                <span className={`${headerClassName}-relative-notification`}>
                  {notifications.filter((f) => !f.isRead).length}
                </span>
              ) : null}
            </div>

            <div className={`header-popover${showPopover ? "-active" : ""}`}>
              <div className={`header-popover-container`}>
                <div className={`header-popover-user`}>
                  {data.user.profilePhoto?.length ? (
                    <img
                      src={data.user.profilePhoto}
                      alt=""
                      className={`header-popover-user-icon`}
                      onClick={() => clickUser()}
                    />
                  ) : (
                    <div className={`header-popover-user-icon`} />
                  )}

                  <div className="header-popover-user-item">
                    <div className="header-popover-user-item-name">{data.user.fullName}</div>
                    <div className="header-popover-user-item-mail">{data.user.mail}</div>
                  </div>
                </div>

                {data.user.role !== "student" ? (
                  <div className={`header-popover-items`}>{renderNavlinkButton(TableButton)}</div>
                ) : (
                  <div className={`header-popover-items`}>
                    {NavlinkButtons.map((item) => renderNavlinkButton(item))}
                  </div>
                )}

                <NavLink
                  className={`header-popover-exit`}
                  onClick={() => {
                    cookie.remove("token");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  to={"/auth"}
                >
                  <ExitIcon className="header-popover-exit-icon" />
                  <div className={`header-popover-exit-text`}>Выйти</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
