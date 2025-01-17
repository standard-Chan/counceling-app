import styled from "styled-components";
import Header from "../../ui/common/Header";
import ChatBody from "../../ui/chat/ChatBody";
import { useEffect } from "react";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f3e8ff;
`;

const Chat = ({setMessage, messages, today}) => {
  useEffect(() => {
    setMessage();
  }, []);
  return (
    <ChatContainer>
      <Header level={1}>채팅 이름</Header>
      <ChatBody responseMessages={messages} today={today}/>
    </ChatContainer>
  );
};

export default Chat;
