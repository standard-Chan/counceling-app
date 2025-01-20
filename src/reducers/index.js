import calendarReducer from "./calendar";
import messageReducer from "./message";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  message: messageReducer,
  calendar: calendarReducer
});

export default rootReducer;