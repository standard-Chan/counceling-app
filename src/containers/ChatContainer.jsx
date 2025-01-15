import { useDispatch, useSelector } from "react-redux";
import { setMessageAction } from "../actions/messageAction";
import Chat from "../components/chat/Chat";
import { useCallback } from "react";

const ChatContainer = () => {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const setMessage = useCallback((messages) => {
    dispatch(setMessageAction(messages));
  }, []);

  return (
    <Chat setMessage={setMessage} messages={messages}/>
  );
};

export default ChatContainer; 