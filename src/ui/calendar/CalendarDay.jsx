import React from 'react';
import styled from 'styled-components';

const DayContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: ${props => (props.isToday ? '#c4a3e2' : '#e6d5f5')};
  color: #5c4776;
  font-size: 13px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${props => (props.isToday ? '#b392d1' : '#d2b8ee')};
    transform: scale(1.05);
  }

  &:active {
    background-color: ${props => (props.isToday ? '#a381c0' : '#c4a3e2')};
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

const CalendarDay = ({ day, onClick, isToday, content }) => {
  const { emotion1, emotion2 } = content;

  return (
    <DayContainer onClick={() => onClick(day)} isToday={isToday}>
      <Label>{day.label}</Label>
      <Content>{emotion1[0]}<br/>{emotion2[0]}</Content>
    </DayContainer>
  );
};

export default CalendarDay;