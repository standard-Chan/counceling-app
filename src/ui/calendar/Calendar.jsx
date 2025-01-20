// UI 컴포넌트
import React from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 20px;
  background-color: #f8f0ff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CalendarDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #e6d5f5;
  color: #5c4776;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    background-color: #d2b8ee;
    transform: scale(1.05);
  }

  &:active {
    background-color: #c4a3e2;
  }
`;
/* days = [
 { date: '2025-01-01', label: '1', details:{'우울' : 2, '불안' : 3}}}, 
 { date: '2025-01-02', label: '2', details: 'Sample Event' }
]
*/
const Calendar = ({ days, onDateClick }) => {
  return (
    <CalendarContainer>
      {days && days.map((day) => (
        <CalendarDay key={day.date} onClick={() => onDateClick(day)}>
          {day.label}
        </CalendarDay>
      ))}
    </CalendarContainer>
  );
};

export default Calendar;