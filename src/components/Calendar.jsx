import { useState } from "react";

function formatDateKey(date) {
  return date.toLocaleDateString("sv-SE");
}

function formatDateDisplay(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function getWeekDates(offset) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + offset * 7);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return formatDateKey(d);
  });
}

const DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

function Calendar({ selectedDate, onDateSelect, todos }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const todayKey = formatDateKey(new Date());
  const weekDates = getWeekDates(weekOffset);

  return (
    <div className='week-view'>
      <div className='week-nav'>
        <button
          className='week-nav-btn'
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          ‹
        </button>
        <div className='week-grid'>
          {weekDates.map((dateKey, index) => {
            const [, , day] = dateKey.split("-").map(Number);
            const count = todos.filter((t) => t.date === dateKey).length;
            const isToday = dateKey === todayKey;
            const isSelected = dateKey === selectedDate;
            const isSaturday = index === 5;
            const isSunday = index === 6;

            return (
              <div
                key={dateKey}
                onClick={() => onDateSelect(dateKey)}
                className={`day-cell
                  ${isSelected ? "selected" : ""}
                  ${isToday ? "today" : ""}
                  ${isSaturday ? "saturday" : ""}
                  ${isSunday ? "sunday" : ""}
                `}
              >
                <span className='day-name'>{DAY_NAMES[index]}</span>
                <span className='day-number'>{day}</span>
                <span className='day-count'>{count}</span>
              </div>
            );
          })}
        </div>
        <button
          className='week-nav-btn'
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          ›
        </button>
      </div>
      <div
        className={`selected-date-display ${selectedDate === todayKey ? "is-today" : ""}`}
      >
        {formatDateDisplay(selectedDate)}
      </div>
    </div>
  );
}

export default Calendar;
export { formatDateKey };
