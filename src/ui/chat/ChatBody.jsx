import React from 'react';
import styled from 'styled-components';

const ChatBodyContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f3e8ff; /* 연보라색에 어울리는 배경색 */
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatBubble = styled.div`
  background-color: #ffffff;
  color: #4a4a4a;
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 70%;
  align-self: ${props => (props.isSender ? 'flex-end' : 'flex-start')};
`;

const ChatBody = ({ messages }) => {
  return (
    <ChatBodyContainer>
      <ChatBubble sender={'true'} text={'text'}/>
    </ChatBodyContainer>
  );
};

export default ChatBody;