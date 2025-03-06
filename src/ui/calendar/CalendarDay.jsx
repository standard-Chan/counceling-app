import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../modal/ModalProvider";
import { getTodayInDateFormat } from "../../lib/date";

const DayContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: ${(props) => (props.istoday ? "#f0c8ff" : "#e6d5f5")};
  background-color: ${(props) => (props.noTalk ? "#f1eaf8" : "#e6d5f5")};
  color: #5c4776;
  font-size: 13px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.istoday ? "#b392d1" : "#d2b8ee")};
    transform: scale(1.05);
  }

  &:active {
    background-color: ${(props) => (props.istoday ? "#38224b" : "#c4a3e2")};
  }
`;

const Label = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 12px;
  color: #5c4776;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CalendarDay = ({dayInfo}) => {
  const [isToday, setIsToday] = useState(false);
  const [noData, setNoData] = useState(false);
  const { emotions, scores } = dayInfo["details"];
  // dayInfo 출력
  // console.log('dayInfo : ', dayInfo);
  useEffect(() => {
    const today = getTodayInDateFormat();
    setIsToday(today === dayInfo.date);
  }, [dayInfo.date]);

  useEffect(() => {
    if(emotions[0] === ''){
      setNoData(true);
    }
  }, [emotions]);

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <DayContainer
          onClick={() => openModal(dayInfo.date, dayInfo)}
          istoday={isToday}
          noTalk={noData}
        >
          <Label>{dayInfo.label}</Label>
          <Content>
            {emotions[0] && `${emotions[0]}: ${scores[0]}`}
            <br />
            {emotions[1] && `${emotions[0]}: ${scores[1]}`}
          </Content>
        </DayContainer>
      )}
    </ModalContext.Consumer>
  );
};

export default CalendarDay;
