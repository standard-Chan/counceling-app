import { useDispatch, useSelector } from "react-redux";
import requestDateMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { use, useCallback, useEffect } from "react";
import { errorAction, hideErrorAction } from "../actions/errorAction";
import Toast from "../ui/common/Toast";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f3e8ff;
  height: 100vh;
`;


const ChatContainer = ({ now }) => {
  const messages = useSelector((state) => state.message.messages);
  const isGettingMessagesLoading = useSelector(
    (state) => state.message.isLoading
  );
  const isGetingMessagesFetchLoading = useSelector(
    (state) => state.message.isLoadingFetch
  );
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // today 대화 기록 얻어오기
  useEffect(() => {
    dispatch(requestDateMessageAction(now));
  }, [now]);

  useEffect(() => {}, [isGettingMessagesLoading]);

  const showErrorToast = useCallback(() => {
    if (error.isError) {
      return <Toast message={error.errorMessage} duration={3000} onClose={()=>dispatch(hideErrorAction())}/>;
    }
  }, [error]);

  return (
    <Container>
      <Chat
        messages={messages}
        now={now}
        loading={isGettingMessagesLoading}
        fetch_loading={isGetingMessagesFetchLoading}
      />
      {showErrorToast()}
    </Container>
  );
};

export default ChatContainer;
