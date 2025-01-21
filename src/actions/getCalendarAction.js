import { getDocument } from "../lib/firebase/readFireStore";

export const SET_CALENDAR = 'chat/SET_CALENDAR';

// state에 달력(일별 메시지) 정보 저장.
const setCalendarAction = (MessagesInMonth) => ({ type: SET_CALENDAR, payload: MessagesInMonth });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestCalendarAction = (date) => {
  return (dispatch) => {
    const yearMonth = date.year + date.month;
    getDocument(`userID/jeong/emotions/${yearMonth}`).then((response) => {
      dispatch(setCalendarAction(response));
    });
  };
}

export default requestCalendarAction;