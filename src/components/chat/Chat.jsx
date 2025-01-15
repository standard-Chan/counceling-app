import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../ui/common/Header";
import Input from "../../ui/common/Input";
import Text from "../../ui/common/Text";
import Button from "../../ui/common/Button";
import FormProvider, { FormContext } from "../../ui/common/Form";
import Card from "../../ui/common/Card";
import ChatInput from "../../ui/chat/ChatInput";
import ChatBody from "../../ui/chat/ChatBody";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #e7e4e799;
`;

const Chat = () => {
  const onSubmit = (values) => {
    console.log("submit : ", values);
  }

  return (
    <ChatContainer>
      <Header level={1}>채팅 이름</Header>
      <ChatBody/>
      <Text>메세지</Text>
      <ChatInput onSubmit={onSubmit}/>
    </ChatContainer>
  );
};

export default Chat;
