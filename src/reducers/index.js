import messageReducer from "./message";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  message: messageReducer,
});

export default rootReducer;