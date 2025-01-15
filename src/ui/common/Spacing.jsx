import React from 'react';
import styled from 'styled-components';

const StyledSpacing = styled.div`
  margin-top: ${props => props['data-margin-top'] || '0'};
  margin-bottom: ${props => props['data-margin-bottom'] || '0'};
  margin-left: ${props => props['data-margin-left'] || '0'};
  margin-right: ${props => props['data-margin-right'] || '0'};
  padding-top: ${props => props['data-padding-top'] || '0'};
  padding-bottom: ${props => props['data-padding-bottom'] || '0'};
  padding-left: ${props => props['data-padding-left'] || '0'};
  padding-right: ${props => props['data-padding-right'] || '0'};
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
      data-margin-top={top || vertical}
      data-margin-bottom={bottom || vertical}
      data-margin-left={left || horizontal}
      data-margin-right={right || horizontal}
      data-padding-top={paddingTop}
      data-padding-bottom={paddingBottom}
      data-padding-left={paddingLeft}
      data-padding-right={paddingRight}
    >
      {children}
    </StyledSpacing>
  );
};

export default Spacing;