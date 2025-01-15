import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../ui/common/Header";
import Input from "../../ui/common/Input";
import Text from "../../ui/common/Text";
import Button from "../../ui/common/Button";
import FormProvider, { FormContext } from "../../ui/common/Form";
import Card from "../../ui/common/Card";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #e7e4e799;
`;

const Chat = () => {
  return (
    <ChatContainer>
      <Header level={1}>채팅 이름</Header>
      <Text>메세지</Text>
      <FormProvider>
        <FormContext.Consumer>
          {({ values, updateValues, reset }) => (
            <Card>
              <Input
                name="message"
                value={values['message']}
                reset={reset}
                updateValues={updateValues}
                placeholder="메시지를 입력하세요..."
              />
              <Button type='submit' onClick={() => {}}>전송</Button>
            </Card>
          )}
        </FormContext.Consumer>
      </FormProvider>
    </ChatContainer>
  );
};

export default Chat;
