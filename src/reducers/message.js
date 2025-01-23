import { SET_MESSAGE, GET_MESSAGES_LOADING } from "../actions/getMessageAction";


const initialState = {
  messages: [],
  isLoading: false,
}

const messageReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_MESSAGE:
      const messages = action.payload;
      return {...state, messages};
    case GET_MESSAGES_LOADING:
      const isLoading = action.payload;
      return {...state, isLoading};
    default:
      return state;
  }
  
}

export default messageReducer;