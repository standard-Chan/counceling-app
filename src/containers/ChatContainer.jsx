import { useDispatch, useSelector } from "react-redux";
import requestMessageAction from "../actions/getMessageAction";
import Chat from "../components/chat/Chat";
import { useCallback } from "react";

const ChatContainer = () => {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const setMessage = useCallback(() => {
    dispatch(requestMessageAction());
  }, []);

  return (
    <Chat setMessage={setMessage} messages={messages}/>
  );
};

export default ChatContainer; 