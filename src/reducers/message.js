import { LOADING_FETCH_MESSAGES } from "../actions/fetchMessagesAction";
import { SET_MESSAGE, GET_MESSAGES_LOADING } from "../actions/getMessageAction";

const initialState = {
  messages: [],
  isLoading: false,
  isLoadingFetch: false,
}

const messageReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_MESSAGE:
      const messagesPayload = action.payload;
      return {...state, messages: [...messagesPayload]};
    case GET_MESSAGES_LOADING:
      const isLoading = action.payload;
      return {...state, isLoading};
    case LOADING_FETCH_MESSAGES:
      const isLoadingFetch = action.payload;
      return {...state, isLoadingFetch};
    default:
      return state;
  }
  
}

export default messageReducer;