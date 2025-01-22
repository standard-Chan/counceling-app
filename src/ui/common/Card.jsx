import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  background-color: ${props => props.bgColor || '#ffffff'};
  border: 1px solid ${props => props.borderColor || '#dcd6f7'};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '20px'};
  margin: ${props => props.margin || '0px'};
  transition: box-shadow 0.3s ease;
  flex-direction: ${props => props.flexDirection || 'row' };

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Card = ({ children, bgColor, borderColor, padding, margin, flexDirection }) => {
  return (
    <StyledCard
      bgColor={bgColor}
      borderColor={borderColor}
      padding={padding}
      margin={margin}
      flexDirection={flexDirection}
    >
      {children}
    </StyledCard>
  );
};

export default Card;