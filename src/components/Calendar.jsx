import { useState } from "react";

function formatDateKey(date) {
  return date.toLocaleDateString("sv-SE"); //JS에 있는 date 객체로 ,
  // 지금 날짜를 스웨덴 형식(2026-06-08)으로 꺼낸다.
}

function formatDateDisplay(dateKey) {
  //date key 에는 2026-06-08 날짜가 들어있음
  const [year, month, day] = dateKey.split("-").map(Number);
  // "-" 기준으로 나누고, 숫자로 바꿔서 각 변수에 넣는다.
  const date = new Date(year, month - 1, day); //다시 date 객체로 만든다.
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }); //한국어 형태로 변환한다. 2026년 6월 8일
}

function getWeekDates(offset) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // .getDay() -> 0(일) , 1(월), 2(화)...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  // dayOfWeek 가 0(일)이면 -6. 아니면 1-dayOfWeek해서 월요일과 차이를 계산
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + offset * 7);
  // 이번주 월요일 날짜를 계산한다.
  monday.setHours(0, 0, 0, 0);
  //시간을 00:00:00 으로 초기화를 한다.

  return Array.from({ length: 7 }, (_, i) => {
    // 길이가 7인 배열 만들기
    const d = new Date(monday);
    d.setDate(monday.getDate() + i); // +1을 하면서 날짜 계산하고
    return formatDateKey(d); // "2026-06-08" 형태로 변환
  });
} // 결과: ["2026-06-08", "2026-06-09", ..., "2026-06-14"]

const DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

// 현재 선택된 날짜 , 날짜 클릭했을 때 실행할 함수 , 전체 할일 목록을 받는다.
function Calendar({ selectedDate, onDateSelect, todos }) {
  const [weekOffset, setWeekOffset] = useState(0); // 주 계산 ( 저번주는 -1, 이번주는 0)
  const todayKey = formatDateKey(new Date()); // 오늘 날짜를 2026-06-08로 지정
  const weekDates = getWeekDates(weekOffset); // weekOffset 기준으로 7일 날짜 배열 가져오기

  return (
    <div className='mb-4'>
      <div className='flex items-center gap-2 mb-2'>
        {/* 이전 주 버튼 */}
        <button
          className='px-3 py-2 rounded-lg bg-gray-100 hover:bg-yellow-300 text-xl'
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          ‹
        </button>

        {/* 날짜 그리드 */}
        <div className='flex flex-1 gap-1'>
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
                className={`
                  flex-1 flex flex-col items-center gap-1 py-2 px-1
                  rounded-xl cursor-pointer border-2 transition-all text-sm
                  ${isSelected ? "bg-yellow-400 border-yellow-500" : "bg-gray-50 border-transparent"}
                  ${isToday && !isSelected ? "border-yellow-400" : ""}
                  ${isSaturday && !isSelected ? "text-blue-500" : ""}
                  ${isSunday && !isSelected ? "text-red-500" : ""}
                `}
              >
                <span className='text-xs font-medium text-gray-500'>
                  {DAY_NAMES[index]}
                </span>
                <span className='font-bold text-gray-900'>{day}</span>
                <span className='text-xs bg-gray-200 rounded-full px-1'>
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* 다음 주 버튼 */}
        <button
          className='px-3 py-2 rounded-lg bg-gray-100 hover:bg-yellow-300 text-xl'
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          ›
        </button>
      </div>

      {/* 선택된 날짜 표시 */}
      <div
        className={`text-center py-2 rounded-xl font-semibold text-sm
          ${
            selectedDate === todayKey
              ? "bg-yellow-50 text-yellow-600 border border-yellow-300"
              : "bg-gray-50 text-gray-600 border border-gray-200"
          }`}
      >
        {formatDateDisplay(selectedDate)}
      </div>
    </div>
  );
}

export default Calendar;
export { formatDateKey };
