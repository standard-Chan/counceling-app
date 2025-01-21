import { useDispatch, useSelector } from "react-redux";
import requestDateMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { useCallback, useEffect } from "react";

const ChatContainer = ({now}) => {
  const messages = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();
  
  // today 대화 기록 얻어오기
  useEffect(() => {
    dispatch(requestDateMessageAction(now));
  }, [now]);

  return (
    <Chat messages={messages} now={now}/>
  );
};

export default ChatContainer; 