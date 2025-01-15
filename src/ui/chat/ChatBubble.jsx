import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  background-color: ${props => (props.isSender ? '#6c63ff' : '#ffffff')};
  color: ${props => (props.isSender ? '#ffffff' : '#4a4a4a')};
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 70%;
  align-self: ${props => (props['data-is-sender'] ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const ChatBubble = ({ text, sender }) => {
  return <Bubble data-is-sender={sender}>{text}</Bubble>;
};

export default ChatBubble;