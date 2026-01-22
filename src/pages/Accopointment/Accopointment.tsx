import React from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { ContainerItem } from "../../types/accopointment";
import { MouseIcon } from "../../components/Icons/Icons";

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

  const renderButton = (item: any) => {
    return (
      <NavLink
        className="accopointment-main-service-buttons-item"
        to={`/${item.link}`}
        key={`accopointment-button-${item.link}`}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth", // для плавной прокрутки
          })
        }
      >
        <div className="accopointment-main-service-buttons-item-icon">
          <div className={`accopointment-main-service-buttons-item-icon-${item.icon}`} />
        </div>
        <div className="accopointment-main-service-buttons-item-name">{item.name}</div>
        <div className="accopointment-main-service-buttons-item-text">{item.text}</div>
      </NavLink>
    );
  };

  return (
    <div className="accopointment">
      <div className="accopointment-main">
        {/* башка */}
        <div className="accopointment-main-tizer">
          <div className="accopointment-main-tizer-title">
            <div className="accopointment-main-tizer-title-text">{data.title1.toUpperCase()}</div>
            <div className="accopointment-main-tizer-title-text accopointment-main-tizer-title-text-colored">
              {data.title2.toUpperCase()}
            </div>
            <div className="accopointment-main-tizer-title-text">{data.title3.toUpperCase()}</div>
            <div className="accopointment-main-tizer-title-welcome">
              <Typewriter
                options={{
                  strings: data.welcome,
                  autoStart: true,
                  loop: false,
                }}
              />
            </div>
            <div className="accopointment-main-tizer-title-subtext">{data.text}</div>
          </div>

          <div className="accopointment-main-tizer-block">
            <div className="accopointment-main-tizer-block-colorFullBg" />
            <div className="accopointment-main-tizer-img" />
          </div>
        </div>

        {/* кнопки */}
        <div className="accopointment-main-service">
          <div className="accopointment-main-service-title">{data.buttonsTitle.title}</div>
          <div className="accopointment-main-service-subtitle">{data.buttonsTitle.subtitle}</div>
          <div
            className="accopointment-main-service-buttons"
            style={{ gridTemplateColumns: `repeat(${data.buttons.length > 3 ? 3 : data.buttons.length}, 1fr)` }}
          >
            {data.buttons.map((item: any) => {
              return renderButton(item);
            })}
          </div>
        </div>

        {/* мышка */}
        <div className="accopointment-main-mouse" onClick={scrollFunc}>
          <MouseIcon />
        </div>
      </div>
    </div>
  );
}
