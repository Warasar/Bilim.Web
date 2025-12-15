import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cookie from "js-cookie";
import { INotification } from "../Profile/ProfileItems/ProfileNotification";
import { requestGet } from "../../actions/actions";

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

    const element = document.getElementById(`vuz_${id}`);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
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
        <div className={`${headerClassName}-flex`}>
          {data.buttons.map((item: any) => {
            if (item.scroll) {
              if (!activeSection && item.link === "vuz") {
                return (
                  <NavLink
                    to={`/${item.link}`}
                    key={`${headerClassName}-flex-item_${item.link}`}
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
              }

              return (
                <div
                  className={`${headerClassName}-flex-item${activeSection === `vuz_${item.link}` ? "-active" : ""}`}
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
          })}
        </div>

        {/* связаться и пользователь */}
        <div className={`${headerClassName}-flex`}>
          {data.phoneLink.isVisible ? (
            <a className={`${headerClassName}-button`} href={data.phoneLink.url} target="_blank" rel="noreferrer">
              <div className={`${headerClassName}-button-mail`} />
              Связаться
            </a>
          ) : null}

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
                  <div className={`header-popover-items`}>
                    <NavLink className="header-popover-items-item" key={"header-popover-items-item_0"} to={"/profile"}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 9L21 9M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                          stroke="#0A304B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="header-popover-items-item-text">Таблицы</div>
                    </NavLink>
                  </div>
                ) : (
                  <div className={`header-popover-items`}>
                    <NavLink
                      className="header-popover-items-item"
                      key={"header-popover-items-item_0"}
                      to={"/profile?code=profile"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="header-popover-items-item-icon"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="header-popover-items-item-text">Мой профиль</div>
                    </NavLink>
                    <NavLink
                      className="header-popover-items-item"
                      key={"header-popover-items-item_1"}
                      to={"/profile?code=docs"}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7Z"
                          stroke="#0A304B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="header-popover-items-item-text">Документы</div>
                    </NavLink>
                    <NavLink
                      to="/profile?code=notification"
                      className="header-popover-items-item"
                      key={"header-popover-items-item_2"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="header-popover-items-item-icon"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                      </svg>
                      <div className="header-popover-items-item-text">
                        Уведомления{" "}
                        {notifications.filter((f) => !f.isRead).length ? (
                          <span className="header-popover-items-item-number">
                            {notifications.filter((f) => !f.isRead).length}
                          </span>
                        ) : null}
                      </div>
                    </NavLink>
                    <NavLink
                      className="header-popover-items-item"
                      key={"header-popover-items-item_3"}
                      to={"/profile?code=homework"}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.5 11H12.5M17.5 15H12.5M17.5 7H12.5M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                          stroke="#0A304B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="header-popover-items-item-text">Домашние задания</div>
                    </NavLink>
                    <NavLink className="header-popover-items-item" key={"header-popover-items-item_3"} to={"/videos"}>
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 48.000000 48.000000"
                        className="header-popover-items-item-icon"
                      >
                        <g
                          transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        >
                          <path
                            d="M47 392 c-14 -15 -17 -42 -17 -154 0 -118 2 -137 18 -151 16 -15 45
                              -17 194 -17 157 0 177 2 191 18 14 15 17 42 17 154 0 118 -2 137 -18 151 -16
                              15 -45 17 -194 17 -157 0 -177 -2 -191 -18z m368 -152 l0 -135 -175 0 -175 0
                              -3 124 c-1 69 0 131 2 138 4 11 42 13 178 11 l173 -3 0 -135z"
                          />
                          <path
                            d="M197 293 c-11 -10 -8 -101 3 -108 12 -7 100 41 100 55 0 8 -79 60
                            -92 60 -2 0 -8 -3 -11 -7z"
                          />
                        </g>
                      </svg>
                      <div className="header-popover-items-item-text">Записи прошлых встреч</div>
                    </NavLink>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="header-popover-exit-icon"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
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
