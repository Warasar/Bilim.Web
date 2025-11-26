import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { CalendarDay, CalendarType } from "./calendarType";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";

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
};

export default function Calendar({ data, mainDate }: Props) {
  const ref: any = useRef(null);
  const [currentDate, setCurrentDate] = useState<any>(dayjs(mainDate, formatDate));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingEnd, setIsAnimatingEnd] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("right");

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

      if (data.some((f: any) => f.eventDate.split("T")[0] === date.split("T")[0])) {
        events = _.cloneDeep(data).filter((f: any) => f.eventDate.split("T")[0] === date.split("T")[0]);
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

  const getStyleHeaderCell = (day: CalendarDay) => {
    const style: React.CSSProperties = {};
    let isChanged: boolean = false;

    data.forEach((item: any) => {
      if (item.dates.some((f: any) => f.split("T")[0] === day.stringDate.split("T")[0]) && !isChanged) {
        style.backgroundColor = "#FEE97D77"; //colorYellow
        isChanged = true;

        const index = item.dates.findIndex((f: any) => f.split("T")[0] === day.stringDate.split("T")[0]);
        if (index === item.dates.length - 1) {
          style.borderRight = "6px solid #0A304B";
        }
        if (index === 0) {
          style.borderLeft = "5px solid #0A304B";
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

  const renderIcon = (event: any, cmd: "eventType" | "moreType") => {
    let jsx: any = null;

    if (event[cmd] === "deadline") {
      jsx = <div className={`${className}-cell-header-icon-text`}>(дедлайн)</div>;
    } else if (event[cmd] === "parents") {
      jsx = <div className={`${className}-cell-header-icon-text`}>(родители)</div>;
    } else if (event[cmd] === "info") {
      jsx = <div className={`${className}-cell-header-icon-red`} />;
    } else if (event[cmd] === "meeting") {
      jsx = <div className={`${className}-cell-header-icon-blue`} />;
    }

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {jsx}
        {event.moreType && cmd !== "moreType" && renderIcon(event, "moreType")}
      </div>
    );
  };

  return (
    <div className={className} ref={ref}>
      <div className={`${className}-block`}>
        <div className={`${className}-title`}>
          Календарь встреч и дедлайнов по поступлению в Казахстан {dayjs(currentDate).format("YYYY")} год
        </div>

        {/* сам календарь */}
        <div className={`${className}-main`}>
          {/* шапка */}
          <div className={`${className}-header`}>
            <div className={`${className}-header-button`} onClick={() => navigateMonth("prev")}>
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
              {MONTHS_RU[currentDate.toDate().getMonth()]} {currentDate.toDate().getFullYear()}
            </div>

            <div className={`${className}-header-button`} onClick={() => navigateMonth("next")}>
              <div className={`${className}-header-button-right`} />
            </div>
          </div>

          {/* дни в неделе */}
          <div className={`${className}-week`}>
            {DAYS_RU.map((day, index) => (
              <div key={day} className={`${className}-week-item ${index === 6 ? `${className}-week-item-red` : ""}`}>
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
              <div
                key={index}
                className={!day.isCurrentMonth ? `${className}-cell-disabled` : `${className}-cell `}
                style={
                  index % 7 === 6
                    ? {
                        borderRight: "none",
                      }
                    : {}
                }
              >
                <div className={`${className}-cell-header`} style={getStyleHeaderCell(day)}>
                  <span
                    className={`${className}-cell-header-text ${
                      !day.isCurrentMonth ? `${className}-cell-header-text-disabled` : ""
                    } ${index % 7 === 6 ? `${className}-cell-header-text-red` : ""}`}
                  >
                    {day.date}
                  </span>
                  {day.events.length === 1 && renderIcon(day.events[0], "eventType")}
                </div>

                <div className={`${className}-cell-rows`} style={getStyleRowCell(day)}>
                  {day.events.map((event: any) => {
                    return (
                      <div
                        key={event.id}
                        className={`${className}-cell-item`}
                        style={getStyleItemCell(event, day.events.length)}
                      >
                        {day.events.length > 1 && renderIcon(event, "eventType")}
                        {event.eventText}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${className}-legend`}>
          <div className={`${className}-legend-title`}>Обозначения:</div>

          <div className={`${className}-legend-items`}>
            <div className={`${className}-legend-item`}>
              <div className={`${className}-legend-item-icon-starblue`} />
              <div className={`${className}-legend-item-text`}>общие встречи для 1 и 2 групп</div>
            </div>

            <div className={`${className}-legend-item`}>
              <div className={`${className}-legend-item-icon-starred`} />
              <div className={`${className}-legend-item-text`}>информация по олимпиадам/конкурсам на грант/скидки</div>
            </div>

            <div className={`${className}-legend-item`}>
              <div className={`${className}-legend-item-event`}>*встреча*</div>
              <div className={`${className}-legend-item-text`}>мероприятие, которое длится определенный срок</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
