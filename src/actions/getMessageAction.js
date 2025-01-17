import { Api } from "../lib/Api";

export const SET_MESSAGE = 'chat/SET_MESSAGE';

// state에 메세지 저장.
const setMessageAction = (message) => ({ type: SET_MESSAGE, payload: message });

export const requestMessageAction = (values=null) => {
  
  console.log(`request  userID/${values}`);
  return (dispatch) => {
    Api.get('/userID', {params: values}).then((response) => {
      dispatch(setMessageAction(response.data));
    });
  };
}

export default requestMessageAction;