import { SET_MESSAGE } from "../actions/messageAction";


const initialState = {
  ids: [],
  messages: {},
}

/*
"messages": [
      {
        "id": 1,
        "time": "2021-07-01T00:00:05",
        "sender": "user",
        "text": "안녕하세요"
      },
      {
        "id": 2,
        "time": "2021-07-01T00:00:06",
        "sender": "bot",
        "text": "안녕하세요. 무엇을 도와드릴까요?"
      }
    ]
*/
const messageReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_MESSAGE:
      const payloadMessages = action.payload.messages;
      const ids = payloadMessages.map((message) => message['id']);
      const messages = payloadMessages.reduce((totalMessage, message) => ({
        ...totalMessage,
        [message['id']] : message,
      }), {});
      return {...state, ids, messages};
    default:
      return state;
  }
}

export default messageReducer;