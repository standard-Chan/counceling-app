import { SET_CALENDAR } from "../actions/getCalendarAction";

const initialState = {}

const calendarReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_CALENDAR:
      const MessagesInMonth = action.payload;
      return {...state, ...MessagesInMonth};
    default:
      return state;
  }
  
}

export default calendarReducer;