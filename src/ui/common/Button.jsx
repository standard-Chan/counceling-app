import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  background-color: ${props => props.disabled ? '#cccacc' : (props.bgColor || '#bbb9f4')};
  color: ${props => props.disabled ? '#666' : (props.color || '#ffffff')};
  font-size: ${props => props.fontSize || '16px'};
  padding: ${props => props.padding || '12px 10px'};
  border: none;
  width: 60px;
  border-radius: 8px;
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : (props.hoverBgColor || '#b0acff')};
    box-shadow: ${props => props.disabled ? 'none' : '0 6px 8px rgba(0, 0, 0, 0.15)'};
  }

  &:active {
    background-color: ${props => props.disabled ? '#ccc' : (props.activeBgColor || '#4e4abf')};
    box-shadow: ${props => props.disabled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
  }
`;

const Button = ({ children, type = 'button', bgColor, color, fontSize, padding, hoverBgColor, activeBgColor, disabled }) => {
  return (
    <StyledButton
      type={type}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      padding={padding}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;