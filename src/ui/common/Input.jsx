import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${props => props.width || '100%'};
  background-color: ${props => props.bgColor || '#ffffff'};
  color: ${props => props.color || '#4a4a4a'};
  font-size: ${props => props.fontSize || '16px'};
  padding: ${props => props.padding || '12px 20px'};
  border: 1px solid ${props => props.borderColor || '#dcd6f7'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${props => props.focusBorderColor || '#b3a1d1'};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const Input = ({ width, bgColor, color, fontSize, padding, borderColor, focusBorderColor, ...rest }) => {
  return (
    <StyledInput
      width={width}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      padding={padding}
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      {...rest}
    />
  );
};

export default Input;