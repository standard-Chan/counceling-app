import calendarReducer from "./calendar";
import errorReducer from "./error";
import messageReducer from "./message";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  message: messageReducer,
  calendar: calendarReducer,
  error: errorReducer,
});

export default rootReducer;