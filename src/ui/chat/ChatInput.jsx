import React from "react";
import styled from "styled-components";
import { FormContext, FormProvider } from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";
import Spacing from "../common/Spacing";
import { useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../actions/fetchMessagesAction";

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  z-index: 1000;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%; /* ChatInput 높이만큼 높이 설정 */
    background-color: #f3e8ff;
    z-index: -1; /* ChatInput 뒤에 배경색이 오도록 설정 */
  }
`;

const ChatInput = ({ onSend, now }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    dispatch(fetchMessagesThunk(values, now));
  };
  return (
    <ChatInputContainer>
      <FormProvider onSubmit={(values) => handleSubmit(values)}>
        <FormContext.Consumer>
          {({ values, updateValues, reset }) => (
            <Card bgColor={"#dcd6f7"} padding={"10px 10px"}>
              <Input
                name="message"
                value={values["message"]}
                reset={reset}
                updateValues={updateValues}
                placeholder="메시지를 입력하세요..."
              />
              <Spacing left={"10px"} />
              <Button type="submit">전송</Button>
            </Card>
          )}
        </FormContext.Consumer>
      </FormProvider>
    </ChatInputContainer>
  );
};

export default ChatInput;
