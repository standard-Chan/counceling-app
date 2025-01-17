import { useDispatch, useSelector } from "react-redux";
import requestMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { useCallback } from "react";

const ChatContainer = ({today}) => {
  const messages = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();
  
  // today 대화 기록 얻어오기
  const setMessage = useCallback(() => {
    dispatch(requestMessageAction(today));
  }, [today]);

  return (
    <Chat setMessage={setMessage} messages={messages} today={today}/>
  );
};

export default ChatContainer; 