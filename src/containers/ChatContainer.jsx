import { useDispatch, useSelector } from "react-redux";
import requestDateMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { use, useCallback, useEffect } from "react";

const ChatContainer = ({now}) => {
  const messages = useSelector((state) => state.message.messages);
  const isGettingMessagesLoading = useSelector((state) => state.message.isLoading);
  const isGetingMessagesFetchLoading = useSelector((state) => state.message.isLoadingFetch);
  const dispatch = useDispatch();
  
  // today 대화 기록 얻어오기
  useEffect(() => {
    dispatch(requestDateMessageAction(now));
  }, [now]);

  useEffect(() => {
  },[isGettingMessagesLoading]);

  return (
    <Chat messages={messages} now={now} loading={isGettingMessagesLoading} fetch_loading={isGetingMessagesFetchLoading}/>
  );
};

export default ChatContainer; 