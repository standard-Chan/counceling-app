import { useEffect, useState } from "react";
import Calendar from "../../ui/calendar/Calendar";
import { getCurrentTime, getDaysInMonth } from "../../lib/date";
import CalendarContainer from "../../containers/CalendarContainer";


const Info = ({children}) => {

  // 여기에서 현재 시간을 가져올 필요 없다. 이후 MainPage와 통합하거나, Context API를 사용하여 전역적으로 바꾸자.
  const [now, setNow] = useState(getCurrentTime());
  
  useEffect(() => {
    setNow(getCurrentTime());
  },[]);

  return (
    <div>
      <h1>Info</h1>
      
      <CalendarContainer now={now}/>
    </div>
  );
};

export default Info;