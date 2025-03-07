import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => props.backgroundcolor || '#ffffff'};
  border: 1px solid ${props => props.bordercolor || '#dcd6f7'};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '20px'};
  margin: ${props => props.margin || '0px'};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Card = ({ children, backgroundcolor, bordercolor, padding, margin}) => {
  return (
    <StyledCard
      backgroundcolor={backgroundcolor}
      bordercolor={bordercolor}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyledCard>
  );
};

export default Card;