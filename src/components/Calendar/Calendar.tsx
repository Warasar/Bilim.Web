import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);
require("dayjs/locale/ru");
dayjs.locale("ru");

interface CalendarEvent {
  id: string;
  title: string;
  type: "consultation" | "lesson" | "test" | "meeting" | "deadline";
}
interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  hasSpecialMark?: boolean;
  specialMarkType?: "star" | "snowflake";
}

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

// Sample events data
const sampleEvents: Record<string, CalendarEvent[]> = {
  "2025-2-3": [{ id: "1", title: "Профориентация: индивидуальные консультации", type: "consultation" }],
  "2025-2-6": [{ id: "2", title: "Англ.яз: тест на определение уровня языка", type: "test" }],
  "2025-2-7": [{ id: "3", title: "Открытие сайта Англ.язык: пробный урок", type: "lesson" }],
  "2025-2-10": [{ id: "4", title: "Англ.язык: асинхронный урок мотивационное письмо", type: "lesson" }],
  "2025-2-15": [{ id: "5", title: "Англ.язык: zoom-встреча урок мотивационное письмо", type: "lesson" }],
  "2025-2-21": [{ id: "6", title: "Zoom-встреча с представителями университета SDU 19:30ч", type: "meeting" }],
  "2025-2-23": [{ id: "7", title: "Мотивационное письмо: тест на определение уровня языка", type: "test" }],
  "2025-2-24": [{ id: "8", title: "Индивидуальные консультации", type: "consultation" }],
  "2025-2-27": [{ id: "9", title: "Крайний срок подачи заявки в Назарбаев Университет", type: "deadline" }],
  "2025-2-28": [{ id: "10", title: "Тесты части по англ.яз. олимпиады SDU (ISPT)", type: "test" }],
  "2025-2-29": [{ id: "11", title: "Zoom-встреча: даты олимпиад в конкурсов на гранты/скидки", type: "meeting" }],
};

export default function Calendar() {
  const ref: any = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1)); // February 2025
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingEnd, setIsAnimatingEnd] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("right");

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);

    // Adjust to start from Monday (1 = Monday, 0 = Sunday)
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const days: CalendarDay[] = [];
    const currentDateIterator = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const dateKey = `${currentDateIterator.getFullYear()}-${
        currentDateIterator.getMonth() + 1
      }-${currentDateIterator.getDate()}`;
      const events = sampleEvents[dateKey] || [];

      days.push({
        date: currentDateIterator.getDate(),
        isCurrentMonth: currentDateIterator.getMonth() === month,
        events,
        hasSpecialMark:
          [7, 21, 27, 29].includes(currentDateIterator.getDate()) && currentDateIterator.getMonth() === month,
        specialMarkType: currentDateIterator.getDate() === 27 ? "star" : "snowflake",
      });

      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection(direction === "prev" ? "left" : "right");

    setTimeout(() => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return newDate;
      });
      setSelectedDay(null);

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

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth && !isAnimating) {
      setSelectedDay(selectedDay === day.date ? null : day.date);
    }
  };

  const calendarDays = getCalendarDays();

  return (
    <div className={className} ref={ref}>
      <div className={`${className}-block`}>
        <div className={`${className}-title`}>Календарь встреч и дедлайнов по поступлению в Казахстан 2025 год</div>

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
                      ? { transform: "translateX(100%)", opacity: 0, transition: "0s" }
                      : { transform: "translateX(-100%)", opacity: 0, transition: "0s" }
                    : animationDirection === "right"
                    ? { transform: "translateX(-100%)", opacity: 0 }
                    : { transform: "translateX(100%)", opacity: 0 }
                  : {
                      transform: "translateX(0%)",
                      opacity: 1,
                    }
              }
            >
              {MONTHS_RU[currentDate.getMonth()]} {currentDate.getFullYear()}
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
                    ? { transform: "translateX(100%)", opacity: 0, transition: "0s" }
                    : { transform: "translateX(-100%)", opacity: 0, transition: "0s" }
                  : animationDirection === "right"
                  ? { transform: "translateX(-100%)", opacity: 0 }
                  : { transform: "translateX(100%)", opacity: 0 }
                : {
                    transform: "translateX(0%)",
                    opacity: 1,
                  }
            }
          >
            {calendarDays.map((day, index) => (
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
                onClick={() => handleDayClick(day)}
              >
                <div className={`${className}-cell-header`}>
                  <span
                    className={`${className}-cell-header-text ${
                      !day.isCurrentMonth ? `${className}-cell-header-text-disabled` : ""
                    } ${index % 7 === 6 ? `${className}-cell-header-text-red` : ""}`}
                  >
                    {day.date}
                  </span>
                  {day.hasSpecialMark && (
                    <div
                      className={`${className}-cell-header-icon${day.specialMarkType === "star" ? "-blue" : "-red"}`}
                    />
                  )}
                </div>

                <div className={`${className}-cell-rows`}>
                  {day.events.map((event) => (
                    <div key={event.id} className={`${className}-cell-item`}>
                      {event.title}
                    </div>
                  ))}
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
