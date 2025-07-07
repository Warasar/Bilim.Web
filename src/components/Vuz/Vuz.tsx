/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const className = "vuz";

type Props = {
  data: {
    iframe: string;
    timings: {
      id: number;
      time: string;
      text: string;
      second: number;
      bold?: boolean;
    }[];
    text: string;
    vuzes: {
      code: string;
      name: string;
      nameShort: string;
      photo: string;
    }[];
  };
};

export default function Vuz({ data }: Props) {
  const [opened, setOpened] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const seekTo = (seconds: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          type: "player:setCurrentTime",
          data: {
            time: seconds,
          },
        }),
        "https://rutube.ru"
      );
    }
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        <div className={`${className}-title`}>Онлайн профтур</div>
        <div className={`${className}-subtitle`}>для поступающих</div>

        <iframe
          src={data.iframe}
          className={`${className}-video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          ref={iframeRef}
        />

        <div className={`${className}-collapse`}>
          <div className={`${className}-collapse-header`}>
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
              className={`${className}-collapse-header-icon`}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div className={`${className}-collapse-header-text`}>Тайминг видео обзора:</div>
            <div
              className={`${className}-collapse-header-arrow${opened ? "-active" : ""}`}
              title={opened ? "Скрыть" : "Раскрыть"}
              onClick={() => setOpened(!opened)}
            />
          </div>

          <div className={`${className}-collapse-items${opened ? `-active` : ""}`}>
            {data.timings.map((item, index) => {
              return (
                <div
                  className={`${className}-collapse-item ${item.bold ? `${className}-collapse-item-bold` : ""}`}
                  key={`${className}-collapse-item_${item.id}`}
                  onClick={() => seekTo(item.second)}
                  style={{
                    paddingTop: index === 0 ? "8px" : "4px",
                    paddingBottom: index === data.timings.length - 1 ? "8px" : "4px",
                  }}
                >
                  {item.time}&nbsp;{item.text}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${className}-text`}>{data.text}</div>

        <div className={`${className}-vuzes`}>
          {data.vuzes.map((item) => {
            return (
              <NavLink
                className={`${className}-vuzes-item`}
                key={`${className}-vuzes-item_${item.code}`}
                to={`${item.code}`}
              >
                <div className={`${className}-vuzes-item-container`}>
                  <img src={`/assets/vuzes/${item.photo}`} alt="" className={`${className}-vuzes-item-photo`} />
                </div>
                <div className={`${className}-vuzes-item-bg`} />
                <div className={`${className}-vuzes-item-shortname`}>{item.nameShort}</div>
                <div className={`${className}-vuzes-item-name`}>{item.name}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
