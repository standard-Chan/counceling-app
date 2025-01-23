import { getDocument } from "../lib/firebase/readFireStore";
import { createDocumentNotExisted } from "../lib/firebase/setFireStore";

export const SET_MESSAGE = 'chat/SET_MESSAGE';
export const GET_MESSAGES_LOADING = 'cahr/SET_GET_LOADING';

// state에 메세지 저장.
const setMessageAction = (messages) => ({ type: SET_MESSAGE, payload: messages });

// message get 로딩
const getMessagesLoading = (isLoading) => ({ type: GET_MESSAGES_LOADING, payload: isLoading });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestDateMessageAction = (date) => {
  return (dispatch) => {
    getMessagesLoading(true);
    const yearMonth = date.year + date.month;
    //createDocumentNotExisted(`userID/jeong/messages/`, yearMonth, {});
    getDocument(`userID/jeong/messages/${yearMonth}`).then((response) => {
      console.log('response', response);
      dispatch(setMessageAction(response[date.day]))
    });
    getMessagesLoading(false);
  };
}

export default requestDateMessageAction;