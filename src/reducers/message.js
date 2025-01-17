import { SET_MESSAGE } from "../actions/getMessageAction";


const initialState = {
  messages: [],
}

const messageReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_MESSAGE:
      const messages = action.payload;
      return {...state, messages};
    default:
      return state;
  }
  
}

export default messageReducer;