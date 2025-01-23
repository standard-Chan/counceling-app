import styled from "styled-components";
import Header from "../../ui/common/Header";
import ChatBody from "../../ui/chat/ChatBody";
import { useEffect } from "react";

const ChatContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f3e8ff;
`;

const Chat = ({messages, now, loading, fetch_loading}) => {
  
  return (
    <ChatContainerDiv>
      <Header color={"#490778"} level={1} center={1}>Emotion Talk</Header>
      <ChatBody responseMessages={messages} now={now} loading={loading} fetch_loading={fetch_loading}/>
    </ChatContainerDiv>
  );
};

export default Chat;
