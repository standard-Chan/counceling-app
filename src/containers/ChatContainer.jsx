import { useDispatch, useSelector } from "react-redux";
import requestMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { useCallback, useEffect } from "react";

const ChatContainer = ({today}) => {
  const messages = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();
  
  // today 대화 기록 얻어오기
  useEffect(() => {
    dispatch(requestMessageAction(today));
  }, [today]);

  return (
    <Chat messages={messages} today={today}/>
  );
};

export default ChatContainer; 