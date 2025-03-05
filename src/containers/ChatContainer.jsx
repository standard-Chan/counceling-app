import { useDispatch, useSelector } from "react-redux";
import requestDateMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { use, useCallback, useEffect } from "react";
import { errorAction, hideErrorAction } from "../actions/errorAction";
import Toast from "../ui/common/Toast";
import styled from "styled-components";
import { getTodayInDateFormat } from "../lib/date";

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
  const isGettingMessagesFetchLoading = useSelector(
    (state) => state.message.isLoadingFetch
  );
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // today 대화 기록 얻어오기
  useEffect(() => {
    const today = getTodayInDateFormat(now);
    const email = localStorage.getItem("email");
    dispatch(requestDateMessageAction(email, today));
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
        fetch_loading={isGettingMessagesFetchLoading}
      />
      {showErrorToast()}
    </Container>
  );
};

export default ChatContainer;
