import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import requestCalendarAction from "../actions/getCalendarAction";
import Calendar from "../ui/calendar/Calendar";
import { getDaysInMonth } from "../lib/date";

const CalendarContainer = ({ now, onDateClick }) => {
  const [days, setDays] = useState([]);

  const emotionsOfMonth = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCalendarAction(now));
  }, [now, dispatch]);

  // 월별 일수를 계산하여 월별 일자 정보 생성
  useEffect(() => {
    const daysInMonth = getDaysInMonth(Number(now.year), Number(now.month));

    const daysInfo = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = String(i).padStart(2, "0");
      const date = `${now.year}-${now.month}-${day}`;
      const label = day;
      let details = { emotion1: ["", "", ""], emotion2: ["", "", ""] };

      // day 해당 날짜의 감정을 매핑하여 CalendarDay에 전달
      if (emotionsOfMonth && emotionsOfMonth.hasOwnProperty(day)) {
        details = emotionsOfMonth[day];
      }
      daysInfo.push({ date, label, details });
    }
    setDays(daysInfo);
  }, [now, emotionsOfMonth]);

  return <Calendar now={now} days={days} onDateClick={onDateClick} />;
};

export default CalendarContainer;
