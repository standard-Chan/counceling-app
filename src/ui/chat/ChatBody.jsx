import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { CONVERSATION_COUNT } from "../../constant";
import Loader from "../common/Loader";

const ChatBodyContainer = styled.div`
  flex: 1;
  padding: 16px;
  margin-bottom: 70px; /* ChatInput 높이만큼 마진 추가 */
  overflow-y: auto;
  background-color: #f3e8ff; /* 연보라색에 어울리는 배경색 */
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 85%;
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: none;
  }
  scrollbar-width: none; /* Firefox */
`;

const ChatBody = ({ responseMessages, now, loading, fetch_loading }) => {
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [startMessage, setStartMessage] = useState("");
  const [chatLocked, setChatLocked] = useState(false);
  // 채팅 메시지 불러오기
  useEffect(() => {
    setMessages(responseMessages);
    // 채팅 10 회 완료
    if (responseMessages && responseMessages.length >= CONVERSATION_COUNT) {
      setChatLocked(true);
    } else {
      setChatLocked(false);
    }
  }, [responseMessages, now]);

  // 첫 채팅 메시지 설정
  useEffect(() => {
    const startMessage =
      "오늘은 무엇을 할 예정이신가요? 나누고 싶은 이야기를 공유해주세요. 있었던 일을 말해주어도 좋아요.";
    setStartMessage(startMessage);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatBodyContainer ref={chatBodyRef}>
      <ChatBubble sender={"start-assistant"} text={startMessage} />
      {messages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <ChatBubble
            key={index}
            sender={message.role}
            text={message.content}
          />
        ))}
        {fetch_loading && <ChatBubble sender={"loading"}><Loader size={'20px'}/></ChatBubble>}
        {loading && <Loader/>}
      <ChatInput now={now} locked={chatLocked} disabled={fetch_loading}/>
    </ChatBodyContainer>
  );
};

export default ChatBody;
