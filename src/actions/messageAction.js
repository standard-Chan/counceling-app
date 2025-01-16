import { Api } from "../lib/Api";

export const SET_MESSAGE = 'chat/SET_MESSAGE';

const setMessageAction = (message) => ({ type: SET_MESSAGE, payload: message });

export const requestMessageAction = (value) => {
  return (dispatch) => {
    Api.get(`/userID`).then((response) => {
      dispatch(setMessageAction(response.data));
    });
  };
}

export default requestMessageAction;