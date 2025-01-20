import { useEffect, useState } from "react";
import Calendar from "../../ui/calendar/Calendar";
import { getCurrentTime, getDaysInMonth } from "../../lib/date";

const Info = ({children}) => {

  // 여기에서 현재 시간을 가져올 필요 없다. 이후 MainPage와 통합하거나, Context API를 사용하여 전역적으로 바꾸자.
  const [now, setNow] = useState(getCurrentTime());
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    setNow(getCurrentTime());
  },[]);

  // 월별 일수를 계산하여 월별 일자 정보 생성
  useEffect(() => {
    const daysInMonth = getDaysInMonth(Number(now.year), Number(now.month));
    
    const daysInfo = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = String(i).padStart(2, '0');
      const date = `${now.year}-${now.month}-${day}`;
      const label = day;
      const details = 'Sample Event';

      daysInfo.push({ date, label, details });
    }

    setDays(daysInfo);
  }, [now]);

  return (
    <div>
      <h1>Info</h1>
      <Calendar now={now} days={days}/>
    </div>
  );
};

export default Info;