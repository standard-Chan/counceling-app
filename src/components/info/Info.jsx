import { useEffect, useState } from "react";
import Calendar from "../../ui/calendar/Calendar";
import { getCurrentTime, getDaysInMonth } from "../../lib/date";
import CalendarContainer from "../../containers/CalendarContainer";
import Header from "../../ui/common/Header";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0e9f4; /* 연한 하늘색 */
  height: 100vh;
  padding: 0px 20px;
`;

const Info = ({children}) => {

  // 여기에서 현재 시간을 가져올 필요 없다. 이후 MainPage와 통합하거나, Context API를 사용하여 전역적으로 바꾸자.
  const [now, setNow] = useState(getCurrentTime());
  
  useEffect(() => {
    setNow(getCurrentTime());
  },[]);

  return (
    <InfoContainer>
      <Header color={"#5842c7"} level={1} center={1} margin={'15px'}>Emotion Calendar</Header>
      <CalendarContainer now={now}/>
    </InfoContainer>
  );
};

export default Info;