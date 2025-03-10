import React from 'react';
import styled from 'styled-components';
import CalendarDay from './CalendarDay';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 20px;
  background-color: #f8f0ff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Calendar = ({ now, daysEmotions, onDateClick }) => {
  return (
    <CalendarContainer>
      {daysEmotions && daysEmotions.map((day) => (
        <CalendarDay
          key={day.date}
          dayInfo={day}
          onClick={onDateClick}
        />
      ))}
    </CalendarContainer>
  );
};

export default Calendar;