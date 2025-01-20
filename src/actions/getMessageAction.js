import { getDocument } from "../lib/firebase/readFireStore";

export const SET_MESSAGE = 'chat/SET_MESSAGE';

// state에 메세지 저장.
const setMessageAction = (messages) => ({ type: SET_MESSAGE, payload: messages });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestDateMessageAction = (date) => {
  return (dispatch) => {
    const yearMonth = date.year + date.month;
    getDocument(`userID/jeong/messages/${yearMonth}`).then((response) => {
      console.log('response', response);
      dispatch(setMessageAction(response[date.day]))
    });
  };
}

export default requestDateMessageAction;