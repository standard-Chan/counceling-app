import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../ui/common/Header";
import Input from "../../ui/common/Input";
import Text from "../../ui/common/Text";
import Button from "../../ui/common/Button";
import FormProvider, { FormContext } from "../../ui/common/Form";
import Card from "../../ui/common/Card";
import ChatBody from "../../ui/chat/ChatBody";
import { gptApi } from "../../lib/Api";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #e7e4e799;
`;

const Chat = ({setMessage, messages}) => {
  useEffect(() => {
    gptApi.get("/response").then((response) => {setMessage(response.data)});
  }, []);

  const onSubmit = (values) => {
    console.log("submit : ", values);
  }

  return (
    <ChatContainer>
      <Header level={1}>채팅 이름</Header>
      <ChatBody onSubmit={onSubmit} responseMessages={messages}/>
    </ChatContainer>
  );
};

export default Chat;
