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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

    // Закрываем мобильное меню при изменении размера окна
    const handleResize = () => {
      if (window.innerWidth > 900 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const getNotification = async () => {
    const notifications: INotification[] = await requestGet(`user/notifications`);
    if (notifications) {
      setNotifications(notifications);
    }
  };

  const clickUser = () => {
    setShowPopover(!showPopover);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

    // Закрываем мобильное меню после клика
    if (window.innerWidth <= 900) {
      setIsMobileMenuOpen(false);
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
                  behavior: "smooth",
                });
                if (window.innerWidth <= 900) {
                  setIsMobileMenuOpen(false);
                }
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
            onClick={() => {
              clickScrollIntoDiv(item.link);
              if (window.innerWidth <= 900) {
                setIsMobileMenuOpen(false);
              }
            }}
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
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            if (window.innerWidth <= 900) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          {item.name}
        </NavLink>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.buttons, activeSection, location.pathname, isScrolled, headerClassName]);

  // Мобильные навигационные ссылки
  const mobileNavLinks = useMemo(() => {
    return data.buttons.map((item: any) => {
      if (item.scroll) {
        return (
          <div
            key={`mobile-${item.link}`}
            className={`header-mobile-link${activeSection === item.link ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv(item.link)}
          >
            {item.name}
          </div>
        );
      }

      return (
        <NavLink
          key={`mobile-nav-${item.link}`}
          to={`/${item.link}`}
          className={`header-mobile-link${location.pathname === `/${item.link}` ? "-active" : ""}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMobileMenuOpen(false);
          }}
        >
          {item.name}
        </NavLink>
      );
    });
  }, [data.buttons, activeSection, location.pathname]);

  const renderNavlinkButton = (item: NavlinkButton) => {
    return (
      <NavLink
        className="header-popover-items-item"
        key={`header-popover-items-item_${item.text}`}
        to={item.link}
        onClick={() => {
          if (window.innerWidth <= 900) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        {item.icon}
        <div className="header-popover-items-item-text">{item.text}</div>
        {notifications.filter((f) => !f.isRead).length && item.link === "/profile?code=notification" ? (
          <span className={`${headerClassName}-relative-notification`} style={{ position: "static" }}>
            {notifications.filter((f) => !f.isRead).length}
          </span>
        ) : null}
      </NavLink>
    );
  };

  return (
    <>
      <div className={`${headerClassName}-bg`}>
        <div className={`${headerClassName}`}>
          {/* Логотип */}
          <NavLink
            to={"/accompaniment"}
            className={`${headerClassName}-logo`}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              if (window.innerWidth <= 900) {
                setIsMobileMenuOpen(false);
              }
            }}
          />

          {/* Десктоп навигация */}
          <div className={`${headerClassName}-flex`}>{scrollButtons}</div>

          {/* Десктоп: кнопка "Связаться" и пользователь */}
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

                {notifications.filter((f) => !f.isRead).length && !showPopover ? (
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

          {/* Бургер-меню для мобильных */}
          <button
            className={`header-burger ${isMobileMenuOpen ? "header-burger-active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className="header-burger-line" />
            <span className="header-burger-line" />
            <span className="header-burger-line" />

            {notifications.filter((f) => !f.isRead).length && !isMobileMenuOpen ? (
              <span className={`${headerClassName}-relative-notification`}>
                {notifications.filter((f) => !f.isRead).length}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`header-mobile-menu-bg ${isMobileMenuOpen ? "header-mobile-menu-bg-active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`header-mobile-menu ${isMobileMenuOpen ? "header-mobile-menu-active" : ""}`}>
        {/* Юзер */}
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

        {/* Навигация в мобильном меню */}
        <div className="header-mobile-menu-links">{mobileNavLinks}</div>

        {/* Кнопка "Связаться" в мобильном меню */}
        {data.phoneLink.url?.length && (
          <div className="header-mobile-menu-buttons">
            <a
              className="header-mobile-button"
              href={data.phoneLink.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="header-mobile-button-mail" />
              Связаться
            </a>
          </div>
        )}

        {/* Пользователь и кнопки */}
        <div className="header-mobile-menu-users">
          {data.user.role !== "student" ? (
            <div className={`header-popover-items`}>{renderNavlinkButton(TableButton)}</div>
          ) : (
            <div className={`header-popover-items`}>{NavlinkButtons.map((item) => renderNavlinkButton(item))}</div>
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
    </>
  );
}
