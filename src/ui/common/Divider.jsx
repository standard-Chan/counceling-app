import React from 'react';
import styled from 'styled-components';

const StyledDivider = styled.hr`
  border: none;
  border-top: ${props => props.thickness || '2px'} solid ${props => props.color || '#dcd6f7'};
  opacity: ${props => props.opacity || '0.5'};
  margin: ${props => props.margin || '20px auto'};
  width: ${props => props.width || '90%'};
`;

const Divider = ({ color, margin, width, thickness, opacity }) => {
  return (
    <StyledDivider
      color={color}
      margin={margin}
      width={width}
      thickness={thickness}
      opacity={opacity}
    />
  );
};

export default Divider;