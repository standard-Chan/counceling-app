import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

const ChatBodyContainer = styled.div`
  flex: 1;
  padding: 16px;
  margin-bottom: 80px; /* ChatInput 높이만큼 마진 추가 */
  overflow-y: auto;
  background-color: #f3e8ff; /* 연보라색에 어울리는 배경색 */
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1c4e9; /* 연보라색에 맞춘 색상 */
    border-radius: 8px; /* 꼭짓점을 둥글게 설정 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b39ddb; /* 연보라색에 맞춘 색상 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f3e8ff;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent; /* 스크롤바 꼭짓점 배경 투명 */
  }

  &::-webkit-scrollbar-button {
    display: none; /* 상단과 하단의 화살표 없애기 */
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: #d1c4e9 #f3e8ff;  /* Firefox */
`;

const ChatBody = ({ responseMessages, today }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(responseMessages);
  }, [responseMessages, today]);

  return (
    <ChatBodyContainer>
      {messages && messages.length > 0 && messages.map((message, index) => (
        <ChatBubble key={index} sender={message.role} text={message.content}/>
      ))}
      <ChatInput today={today}/>
    </ChatBodyContainer>
  );
};

export default ChatBody;