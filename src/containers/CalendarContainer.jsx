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
      /*
      advice: "좋은 하루의 기분을 만끽하세요."
      date: "20250305"
      emotions:(2) ['설렘', '아픔']
      reasons:(2) ['내일도 살아갈 수 있다는 사실에 설렙니다.', '공부를 오래해서 허리가 아픕니다.']
      scores: (2) [6, 5]
      userEmail: "123@123"
*/
      let details = { emotions:["",""], reasons:["",""], scores:[0,0], advice:"" };

      // day 해당 날짜의 감정을 매핑하여 CalendarDay에 전달
      if (emotionsOfMonth && emotionsOfMonth.hasOwnProperty(day)) {
        details = emotionsOfMonth[day];
      }
      daysInfo.push({ date, label, details });
    }
    setDays(daysInfo);
  }, [now, emotionsOfMonth]);

  return <Calendar now={now} daysEmotions={days} onDateClick={onDateClick} />;
};

export default CalendarContainer;
