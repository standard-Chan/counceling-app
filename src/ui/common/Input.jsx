import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  display: inline-block;
  background-color: ${(props) => props.bgColor || "#ffffff"};
  color: ${(props) => props.color || "#4a4a4a"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: ${(props) => props.padding || "12px 20px"};
  border: 1px solid ${(props) => props.borderColor || "#dcd6f7"};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${(props) => props.focusBorderColor || "#b3a1d1"};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const Input = ({
  name,
  value = '',
  updateValues,
  width,
  bgColor,
  color,
  fontSize,
  padding,
  borderColor,
  focusBorderColor,
  disabled,
}) => {
  const onChange = (e) => {
    if (updateValues)
      updateValues(name, e.target.value);
  }

  return (
    <StyledInput
      id={`input_${name}`}
      name={name}
      value={value}
      onChange={onChange}
      width={width}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      padding={padding}
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      disabled={disabled}
    />
  );
};

export default Input;
