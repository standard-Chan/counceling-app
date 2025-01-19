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
      <Header color={"#490778"} level={1} center={1}>감정 상담</Header>
      <ChatBody responseMessages={messages} today={today}/>
    </ChatContainer>
  );
};

export default Chat;
