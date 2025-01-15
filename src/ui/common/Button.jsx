import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.bgColor || '#908dff'};
  color: ${props => props.color || '#ffffff'};
  font-size: ${props => props.fontSize || '16px'};
  padding: ${props => props.padding || '12px 24px'};
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${props => props.hoverBgColor || '#b0acff'};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: ${props => props.activeBgColor || '#4e4abf'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Button = ({ children, bgColor, color, fontSize, padding, hoverBgColor, activeBgColor }) => {
  return (
    <StyledButton
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      padding={padding}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
    >
      {children}
    </StyledButton>
  );
};

export default Button;