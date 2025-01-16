import React, { useEffect, useState } from 'react';
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

const ChatBody = ({ responseMessages, onSubmit }) => {
  const [messages, setMessages] = useState([]);
  const [date, setDate] = useState("20250117");

  useEffect(() => {
    setMessages(responseMessages.messages[date]);
  }, [responseMessages, date]);

  
  return (
    <ChatBodyContainer>
      {messages && messages.length > 0 && messages.map((message, index) => {
        return (
        <ChatBubble key={index} sender={message.role} text={message.content}/>
      )}
      )}
      <ChatBubble sender={'user'} text={'끝'}/>
      <ChatInput onSubmit={onSubmit}/>
    </ChatBodyContainer>
  );
};

export default ChatBody;