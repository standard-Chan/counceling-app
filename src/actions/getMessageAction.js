import { getDocument } from "../lib/firebase/readFireStore";

export const SET_MESSAGE = 'chat/SET_MESSAGE';
export const GET_MESSAGES_LOADING = 'chat/SET_GET_LOADING';

// state에 메세지 저장.
export const setMessageAction = (messages) => ({ type: SET_MESSAGE, payload: messages });

// message get 로딩
export const getMessagesLoading = (isLoading) => ({ type: GET_MESSAGES_LOADING, payload: isLoading });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestDateMessageAction = (date) => {
  return (dispatch) => {
    dispatch(getMessagesLoading(true));
    const yearMonth = date.year + date.month;
    //createDocumentNotExisted(`userID/jeong/messages/`, yearMonth, {});
    getDocument(`userID/jeong/messages/${yearMonth}`)
    .then((response) => {
      dispatch(setMessageAction(response[date.day]))
    })
    .catch((error) => { 
      console.log('[ERROR] : 해당 데이터를 GET 처리 할수 없습니다.', error);
    })
    .finally(() => {
      dispatch(getMessagesLoading(false));
    })
  };
}

export default requestDateMessageAction;