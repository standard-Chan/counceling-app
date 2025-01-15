import React from 'react';
import styled from 'styled-components';

const StyledSpacing = styled.div`
  margin-top: ${props => props.vertical || props.marginTop || '0'};
  margin-bottom: ${props => props.vertical || props.marginBottom || '0'};
  margin-left: ${props => props.horizontal || props.marginLeft || '0'};
  margin-right: ${props => props.horizontal || props.marginRight || '0'};
  padding-top: ${props => props.paddingTop || '0'};
  padding-bottom: ${props => props.paddingBottom || '0'};
  padding-left: ${props => props.paddingLeft || '0'};
  padding-right: ${props => props.paddingRight || '0'};
`;

const Spacing = ({ 
  children, 
  top, 
  bottom, 
  left, 
  right, 
  paddingTop, 
  paddingBottom, 
  paddingLeft, 
  paddingRight,
  vertical,
  horizontal
}) => {
  return (
    <StyledSpacing
      marginTop={top}
      marginBottom={bottom}
      marginLeft={left}
      marginRight={right}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      vertical={vertical}
      horizontal={horizontal}
    >
      {children}
    </StyledSpacing>
  );
};

export default Spacing;