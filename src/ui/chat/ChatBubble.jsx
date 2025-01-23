import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  background-color: ${props => (props.sender === 'user' ? '#6c63ff' : '#ffffff')};
  color: ${props => (props.sender === 'user' ? '#ffffff' : '#4a4a4a')};
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: ${props => props.width || '60%'};
  align-self: ${props => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const ChatBubble = ({ text, sender, width, children }) => {
  return <Bubble sender={sender} width={width}>{text} {children}</Bubble>;
};

export default ChatBubble;