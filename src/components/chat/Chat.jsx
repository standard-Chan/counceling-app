import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../ui/common/Header";
import Input from "../../ui/common/Input";
import Text from "../../ui/common/Text";
import Button from "../../ui/common/Button";
import FormProvider, { FormContext } from "../../ui/common/Form";
import Card from "../../ui/common/Card";
import ChatBody from "../../ui/chat/ChatBody";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #e7e4e799;
`;

const Chat = () => {
  const response = {
    messages: [
      {
        sender: "user",
        text: "안녕하세요ㅎ",
      },
      {
        sender: "bot",
        text: "안녕하세요. 무엇을 도와드릴까요?",
      },
    ],
  };
  const onSubmit = (values) => {
    console.log("submit : ", values);
  }

  return (
    <ChatContainer>
      <Header level={1}>채팅 이름</Header>
      <ChatBody response={response} onSubmit={onSubmit}/>
    </ChatContainer>
  );
};

export default Chat;
