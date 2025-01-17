import { Api } from "../lib/Api";
import { getDocument } from "../lib/firebase/readFireStore";

export const SET_MESSAGE = 'chat/SET_MESSAGE';

// state에 메세지 저장.
const setMessageAction = (messages) => ({ type: SET_MESSAGE, payload: messages });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
export const requestMessageAction = (date) => {
  return (dispatch) => {
    console.log("왜왜!!");
    getDocument("userID/jeong/messages/jeong-messages").then((response) => {
      console.log("res : ", response[date]);
      dispatch(setMessageAction(response[date]))
    });
  };
}

export default requestMessageAction;