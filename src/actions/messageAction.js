import { gptApi } from "../lib/Api";

export const SET_MESSAGE = 'chat/SET_MESSAGE';

const setMessageAction = (message) => ({ type: SET_MESSAGE, payload: message });

export const requestMessageAction = (param = false) => {
  if (!param) {
    return (dispatch) => {
      gptApi.get("/response").then((response) => {
        dispatch(setMessageAction(response.data));
      });
    }
  }
  return (dispatch) => {
    gptApi.get('/response', { params: param }).then((response) => {
      dispatch(setMessageAction(response.data));
    });
  };
}

export default requestMessageAction;