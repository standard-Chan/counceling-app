import React from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

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

/*
const response = {
  messages: [
    {
      sender: "user",
      text: "안녕하세요",
    },
    {
      sender: "bot",
      text: "안녕하세요. 무엇을 도와드릴까요?",
    },
  ],
};
*/

const ChatBody = ({ messages, response, onSubmit }) => {
  return (
    <ChatBodyContainer>
      {response.messages.map((message, index) => (
        <ChatBubble key={index} sender={message.sender} text={message.text}/>
      ))}
      <ChatBubble sender={'user'} text={'끝'}/>
      <ChatInput onSubmit={onSubmit}/>
    </ChatBodyContainer>
  );
};

export default ChatBody;