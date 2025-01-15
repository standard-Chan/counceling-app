import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  color: ${props => props.color || '#4a4a4a'};
  font-size: ${props => props.fontSize || '16px'};
  text-align: ${props => props.textAlign || 'left'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
`;

const Text = ({ children, color, fontSize, textAlign, margin, padding }) => {
  return (
    <StyledText
      color={color}
      fontSize={fontSize}
      textAlign={textAlign}
      margin={margin}
      padding={padding}
    >
      {children}
    </StyledText>
  );
};

export default Text;