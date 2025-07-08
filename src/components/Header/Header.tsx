import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

  const headerClassName = !isScrolled ? "header" : "header-scrolled";
  const location = useLocation();
  const popoverRef = useClickOutside(() => setShowPopover(false));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clickUser = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div className={`${headerClassName}-bg`}>
      <div className={`${headerClassName}`}>
        {/* лого  */}
        <NavLink
          to={"/"}
          className={`${headerClassName}-logo`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth", // для плавной прокрутки
            });
          }}
        />
        {/* <div className={`${headerClassName}-logo`} /> */}

        {/* кнопки */}
        <div className={`${headerClassName}-flex`}>
          {data.buttons.map((item: any) => {
            if (item.scroll) {
              return (
                <div
                  className={`${headerClassName}-flex-item${
                    location.pathname === `/${item.link}` ? "-active" : ""
                  }`}
                >
                  {item.name}
                </div>
              );
            }

            return (
              <NavLink
                to={`/${item.link}`}
                className={`${headerClassName}-flex-item${
                  location.pathname === `/${item.link}` ? "-active" : ""
                }`}
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
          <a
            className={`${headerClassName}-button`}
            href={data.phoneLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className={`${headerClassName}-button-mail`} />
            Связаться
          </a>
          <div className={`header-popoverParent`} ref={popoverRef}>
            <div
              className={`${headerClassName}-user`}
              onClick={() => clickUser()}
            />
            <div className={`header-popover${showPopover ? "-active" : ""}`}>
              <div className={`header-popover-container`}>
                <div className={`header-popover-user`}>
                  <div className={`header-popover-user-icon`} />
                  <div className="header-popover-user-item">
                    <div className="header-popover-user-item-name">
                      {data.user.name}
                    </div>
                    <div className="header-popover-user-item-mail">
                      {data.user.mail}
                    </div>
                  </div>
                </div>

                <div className={`header-popover-items`}>
                  <div className="header-popover-items-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="header-popover-items-item-icon"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div className="header-popover-items-item-text">
                      Мой профиль
                    </div>
                  </div>
                  <div className="header-popover-items-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="header-popover-items-item-icon"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                    </svg>
                    <div className="header-popover-items-item-text">
                      Уведомления
                    </div>
                  </div>
                  <div className="header-popover-items-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="header-popover-items-item-icon"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <div className="header-popover-items-item-text">
                      Настройки
                    </div>
                  </div>
                </div>

                <div className={`header-popover-items`}>
                  <div className={`header-popover-items-title`}>Группы</div>
                  {data.groups.map((item: any) => {
                    return (
                      <NavLink
                        className={`header-popover-items-text`}
                        to={`/${item.link}`}
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
                </div>

                <div className={`header-popover-exit`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="header-popover-exit-icon"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  <div className={`header-popover-exit-text`}>Выйти</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
