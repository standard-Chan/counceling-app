import combineConversationByRoles from "../lib/combineConversationByRoles";
import { getConversationApi, GetConversationApi } from "../lib/springBootApi/emotionConversation";

export const SET_MESSAGE = 'chat/SET_MESSAGE';
export const GET_MESSAGES_LOADING = 'chat/SET_GET_LOADING';

// state에 메세지 저장.
export const setMessageAction = (messages) => ({ type: SET_MESSAGE, payload: messages });

// message get 로딩
export const getMessagesLoading = (isLoading) => ({ type: GET_MESSAGES_LOADING, payload: isLoading });

// date 대화 기록 얻고 redux state에 반영하기 (이후 userID 및 다른 변수도 받도록 수정)
const requestDateMessageAction = (email, today) => {
  return (dispatch) => {
    /*
        response format
        "userMessage" :  ["사용자의 말", "..."]
        "assistantMessage" :  ["...", "GPT response"]
    */
    dispatch(getMessagesLoading(true));
    //오늘 대화 기록 가져오기
    const token = localStorage.getItem("token");
    getConversationApi(email, today, token).then((response) => {
      const messages = combineConversationByRoles(response.userConversation, response.assistantConversation);
      dispatch(setMessageAction(messages));
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