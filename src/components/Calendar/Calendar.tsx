import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { CalendarDay, CalendarType } from "./calendarType";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";
import { Tooltip } from "antd";

dayjs.extend(customParseFormat);
dayjs.extend(dayLocaleData);
require("dayjs/locale/ru");
dayjs.locale("ru");

const className = "calendar";
const MONTHS_RU = [
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ",
];
const DAYS_RU = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const formatDate = "DD-MM-YYYYTHH:mm:ss";

type Props = {
  data: any;
  mainDate: string;
  main: any;
  legends: any;
};

export default function Calendar({ data, mainDate, main, legends }: Props) {
  const ref: any = useRef(null);
  const [currentDate, setCurrentDate] = useState<any>(
    dayjs(mainDate, formatDate)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingEnd, setIsAnimatingEnd] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("right");

  const getCalendarDays = () => {
    const year = currentDate.toDate().getFullYear();
    const month = currentDate.toDate().getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);

    // Adjust to start from Monday (1 = Monday, 0 = Sunday)
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const days: CalendarDay[] = [];
    const currentDateIterator = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const date = dayjs(currentDateIterator).format(formatDate);
      let events: CalendarType[] = [];

      if (
        data.some((f: any) => f.eventDate.split("T")[0] === date.split("T")[0])
      ) {
        events = _.cloneDeep(data).filter(
          (f: any) => f.eventDate.split("T")[0] === date.split("T")[0]
        );
      }

      days.push({
        stringDate: date,
        date: currentDateIterator.getDate(),
        isCurrentMonth: currentDateIterator.getMonth() === month,
        events,
      });

      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }

    return days;
  };
  const calendarDays: CalendarDay[] = getCalendarDays();

  const navigateMonth = (direction: "prev" | "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection(direction === "prev" ? "left" : "right");

    setTimeout(() => {
      setCurrentDate((prev: any) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return dayjs(newDate);
      });

      setTimeout(() => {
        setIsAnimatingEnd(true);

        setTimeout(() => {
          setIsAnimatingEnd(false);
        }, 100);
      }, 100);

      // Wait for enter animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }, 200);
  };

  const isDateBetweenInclusive = (
    dateToCheck: string,
    startDate: string,
    endDate: string
  ) => {
    const getTime = (dateStr: string) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    const date = getTime(dateToCheck);
    const start = getTime(startDate);
    const end = getTime(endDate);

    return date >= start && date <= end;
  };

  const getStyleHeaderCell = (day: CalendarDay) => {
    const style: React.CSSProperties = {};
    let isChanged: boolean = false;

    data.forEach((item: any) => {
      if (item.startWhen && item.endWhen && !isChanged) {
        if (
          isDateBetweenInclusive(
            day.stringDate.split("T")[0],
            item.startWhen.split("T")[0],
            item.endWhen.split("T")[0]
          )
        ) {
          style.backgroundColor = "#FEE97D77"; //colorYellow
          isChanged = true;

          if (day.stringDate.split("T")[0] === item.endWhen.split("T")[0]) {
            style.borderRight = "6px solid #0A304B";
          }
          if (day.stringDate.split("T")[0] === item.startWhen.split("T")[0]) {
            style.borderLeft = "5px solid #0A304B";
          }
        }
      }
    });

    return style;
  };

  const getStyleRowCell = (day: CalendarDay) => {
    const style: React.CSSProperties = {};

    if (day.events.some((f: any) => f.eventType === "events")) {
      style.backgroundColor = "#FEE97D77"; //colorYellow
    }

    return style;
  };

  const getStyleItemCell = (event: any, length: number) => {
    const style: React.CSSProperties = {};

    if (event.isImportant) {
      style.color = "#B20115";
    }

    if (length > 1) {
      style.display = "grid";
      style.gridTemplateColumns = "auto 1fr";
      style.alignItems = "start";
      style.justifyContent = "end";
    }

    return style;
  };

  const renderIcon = (event: any) => {
    let jsx: any = (
      <div
        className={`${className}-legend-item-icon-${event.eventType}`}
        style={{ width: "16px", height: "16px" }}
      />
    );

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {jsx}
      </div>
    );
  };

  const renderTooltip = (day: any) => {
    if (!day.events.length) return null;

    return (
      <div className={`${className}-tooltip`}>
        {day.events.map((event: any) => {
          return (
            <div
              key={event.id}
              className={`${className}-tooltip-item`}
              style={getStyleItemCell(event, day.events.length)}
            >
              <div className={`${className}-tooltip-header`}>
                {event.eventText}
                {renderIcon(event)}
              </div>
              <div
                className={`${className}-tooltip-text`}
                dangerouslySetInnerHTML={{ __html: event?.description }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={className} ref={ref}>
      <div className={`${className}-block`}>
        <div className={`${className}-title`}>{main?.title}</div>

        {/* сам календарь */}
        <div className={`${className}-main`}>
          {/* шапка */}
          <div className={`${className}-header`}>
            <div
              className={`${className}-header-button`}
              onClick={() => navigateMonth("prev")}
            >
              <div className={`${className}-header-button-left`} />
            </div>

            <div
              className={`${className}-header-text`}
              style={
                isAnimating
                  ? isAnimatingEnd
                    ? animationDirection === "right"
                      ? {
                          transform: "translateX(100%)",
                          opacity: 0,
                          transition: "0s",
                        }
                      : {
                          transform: "translateX(-100%)",
                          opacity: 0,
                          transition: "0s",
                        }
                    : animationDirection === "right"
                      ? { transform: "translateX(-100%)", opacity: 0 }
                      : { transform: "translateX(100%)", opacity: 0 }
                  : {
                      transform: "translateX(0%)",
                      opacity: 1,
                    }
              }
            >
              {MONTHS_RU[currentDate.toDate().getMonth()]}{" "}
              {currentDate.toDate().getFullYear()}
            </div>

            <div
              className={`${className}-header-button`}
              onClick={() => navigateMonth("next")}
            >
              <div className={`${className}-header-button-right`} />
            </div>
          </div>

          {/* дни в неделе */}
          <div className={`${className}-week`}>
            {DAYS_RU.map((day, index) => (
              <div
                key={day}
                className={`${className}-week-item ${index === 6 ? `${className}-week-item-red` : ""}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* сам grid календарь*/}
          <div
            className={`${className}-rows`}
            style={
              isAnimating
                ? isAnimatingEnd
                  ? animationDirection === "right"
                    ? {
                        transform: "translateX(100%)",
                        opacity: 0,
                        transition: "0s",
                      }
                    : {
                        transform: "translateX(-100%)",
                        opacity: 0,
                        transition: "0s",
                      }
                  : animationDirection === "right"
                    ? { transform: "translateX(-100%)", opacity: 0 }
                    : { transform: "translateX(100%)", opacity: 0 }
                : {
                    transform: "translateX(0%)",
                    opacity: 1,
                  }
            }
          >
            {calendarDays.map((day: any, index: number) => (
              <Tooltip
                placement="bottom"
                title={renderTooltip(day)}
                trigger="click"
                color="#94a3b8"
                style={{ maxWidth: "400px" }}
              >
                <div
                  key={index}
                  className={
                    !day.isCurrentMonth
                      ? `${className}-cell-disabled`
                      : `${className}-cell `
                  }
                  style={
                    index % 7 === 6
                      ? {
                          borderRight: "none",
                        }
                      : {}
                  }
                >
                  <div
                    className={`${className}-cell-header`}
                    style={getStyleHeaderCell(day)}
                  >
                    <span
                      className={`${className}-cell-header-text ${
                        !day.isCurrentMonth
                          ? `${className}-cell-header-text-disabled`
                          : ""
                      } ${index % 7 === 6 ? `${className}-cell-header-text-red` : ""}`}
                    >
                      {day.date}
                    </span>
                    {day.events.length === 1 && renderIcon(day.events[0])}
                  </div>

                  <div
                    className={`${className}-cell-rows`}
                    style={getStyleRowCell(day)}
                  >
                    {day.events.map((event: any) => {
                      return (
                        <div
                          key={event.id}
                          className={`${className}-cell-item`}
                          style={getStyleItemCell(event, day.events.length)}
                        >
                          {day.events.length > 1 && renderIcon(event)}
                          {event.eventText}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className={`${className}-legend`}>
          <div className={`${className}-legend-title`}>
            {main?.legendTitle}:
          </div>

          <div className={`${className}-legend-items`}>
            {legends?.map((item: any) => {
              return (
                <div className={`${className}-legend-item`}>
                  <div
                    className={`${className}-legend-item-icon-${item.code}`}
                  />
                  <div className={`${className}-legend-item-text`}>
                    {item.name}
                  </div>
                </div>
              );
            })}

            <div className={`${className}-legend-item`}>
              <div className={`${className}-legend-item-event`}>*встреча*</div>
              <div className={`${className}-legend-item-text`}>
                мероприятие, которое длится определенный срок
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
