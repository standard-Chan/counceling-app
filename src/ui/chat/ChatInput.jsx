import React from 'react';
import styled from 'styled-components';
import { FormContext, FormProvider } from '../common/Form';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import Spacing from '../common/Spacing';

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  z-index: 1000;
`;

const ChatInput = ({ onSend, onSubmit }) => {
  return (
    <ChatInputContainer>
      <FormProvider onSubmit={onSubmit}>
        <FormContext.Consumer>
          {({ values, updateValues, reset }) => (
            <Card bgColor={'#dcd6f7'} padding={'10px 10px'}>
              <Input
                name="message"
                value={values["message"]}
                reset={reset}
                updateValues={updateValues}
                placeholder="메시지를 입력하세요..."
              />
              <Spacing left={'10px'}/>
              <Button type="submit">전송</Button>
            </Card>
          )}
        </FormContext.Consumer>
      </FormProvider>
    </ChatInputContainer>
  );
};

export default ChatInput;