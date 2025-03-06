import { getMonthEmotionApi } from "../lib/springBootApi/emotion";

export const SET_CALENDAR = 'chat/SET_CALENDAR';

// state에 달력(일별 메시지) 정보 저장.
const setCalendarAction = (MessagesInMonth) => ({ type: SET_CALENDAR, payload: MessagesInMonth });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestCalendarAction = (date) => {
  return (dispatch) => {
    const yearMonth = date.year + date.month;
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    getMonthEmotionApi(email, yearMonth,token).then((response) => {
      const emotionsInMonth = response.reduce((emotionsInDay, item) => {
        const day = item.date.slice(-2); // 날짜의 마지막 두 자리 추출
        emotionsInDay[day] = item;
        return emotionsInDay;
    }, {});
    console.log(emotionsInMonth);
    dispatch(setCalendarAction(emotionsInMonth));
    });
  };
}

export default requestCalendarAction;