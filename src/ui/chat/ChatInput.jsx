import React from "react";
import styled from "styled-components";
import { FormContext, FormProvider } from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

const ChatInputContainer = styled.div`
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  width: 100%;
`;

const ChatInput = ({ onSend, onSubmit }) => {
  return (
    <ChatInputContainer>
      <FormProvider onSubmit={onSubmit}>
        <FormContext.Consumer>
          {({ values, updateValues, reset }) => (
            <Card>
              <Input
                name="message"
                value={values["message"]}
                reset={reset}
                updateValues={updateValues}
                placeholder="메시지를 입력하세요..."
              />
              <Button type="submit" onClick={() => {}}>
                전송
              </Button>
            </Card>
          )}
        </FormContext.Consumer>
      </FormProvider>
    </ChatInputContainer>
  );
};

export default ChatInput;
