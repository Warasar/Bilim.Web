import React from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { ContainerItem } from "../../types/accopointment";

const className = "accopointment";

type Props = {
  data: ContainerItem;
};

export default function Accopointment({ data }: Props) {
  const scrollFunc = () => {
    window.scrollTo({
      top: window.innerHeight - 62,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {/* башка */}
        <div className={`${className}-main-tizer`}>
          <div className={`${className}-main-tizer-title`}>
            <div className={`${className}-main-tizer-title-text`}>{data.title1.toUpperCase()}</div>
            <div className={`${className}-main-tizer-title-text ${className}-main-tizer-title-text-colored`}>
              {data.title2.toUpperCase()}
            </div>
            <div className={`${className}-main-tizer-title-text`}>{data.title3.toUpperCase()}</div>
            <div className={`${className}-main-tizer-title-welcome`}>
              <Typewriter
                options={{
                  strings: data.welcome,
                  autoStart: true,
                  loop: false,
                }}
              />
            </div>
            <div className={`${className}-main-tizer-title-subtext`}>{data.text}</div>
          </div>

          <div className={`${className}-main-tizer-block`}>
            <div className={`${className}-main-tizer-block-colorFullBg`} />
            <div className={`${className}-main-tizer-img`} />
          </div>
        </div>

        {/* кнопки */}
        <div className={`${className}-main-service`}>
          <div className={`${className}-main-service-title`}>{data.buttonsTitle.title}</div>
          <div className={`${className}-main-service-subtitle`}>{data.buttonsTitle.subtitle}</div>
          <div
            className={`${className}-main-service-buttons`}
            style={{ gridTemplateColumns: `repeat(${data.buttons.length > 3 ? 3 : data.buttons.length}, 1fr)` }}
          >
            {data.buttons.map((item: any) => {
              return (
                <NavLink
                  className={`${className}-main-service-buttons-item`}
                  to={`/${item.link}`}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // для плавной прокрутки
                    })
                  }
                >
                  <div className={`${className}-main-service-buttons-item-icon`}>
                    <div className={`${className}-main-service-buttons-item-icon-${item.icon}`} />
                  </div>
                  <div className={`${className}-main-service-buttons-item-name`}>{item.name}</div>
                  <div className={`${className}-main-service-buttons-item-text`}>{item.text}</div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* мышка */}
        <div className={`${className}-main-mouse`} onClick={scrollFunc}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mouse  h-7 w-7 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 xl:block"
            aria-hidden="true"
          >
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <path d="M12 6v4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
