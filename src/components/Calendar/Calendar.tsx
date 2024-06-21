import "./Calendar.css";
import React, { useState, useEffect } from "react";

interface CalendarProps {
  value: string;
  onChange: (value: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const getDaysInMonth = (date: Date) => {
    const days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = prevMonthDays; i > 0; i--) {
      days.push(new Date(date.getFullYear(), date.getMonth(), 0 - i + 1));
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    const nextMonthDays = 7 - (days.length % 7 === 0 ? 7 : days.length % 7);
    for (let i = 1; i < nextMonthDays; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleDayClick = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onChange(formatDate(date));
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button type="button" onClick={handlePrevMonth}></button>
        <span>
          {`${currentDate
            .toLocaleString("default", { month: "long" })
            .charAt(0)
            .toUpperCase()}${currentDate
            .toLocaleString("default", { month: "long" })
            .slice(1)}`}{" "}
          {currentDate.getFullYear()}
        </span>
        <button type="button" onClick={handleNextMonth}></button>
      </div>
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              day.getMonth() !== currentDate.getMonth() ? "outside" : ""
            } ${
              day &&
              selectedDate &&
              day.toDateString() === selectedDate.toDateString()
                ? "selected"
                : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
