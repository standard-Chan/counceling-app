import { doc, runTransaction } from "firebase/firestore";
import { CONVERSATION_COUNT } from "../constant";
import gptApi, { convertToGptRequestPayload, convertToGptRequestPayloadForEmotion } from "../lib/gptApi";
import requestDateMessageAction, { setMessageAction } from "./getMessageAction";
import { db } from "../lib/firebase/firebase";
import { errorAction, FETCH_ERROR } from "./errorAction";
import { postConversationApi } from "../lib/springBootApi/emotionConversation";
import { postEmotionApi } from "../lib/springBootApi/emotion";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';
export const LOADING_FETCH_MESSAGES = 'chat/LOADING_FETCH_MESSAGES_';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });
export const fetchMessagesLoading = (isLoading) => ({ type: LOADING_FETCH_MESSAGES, payload: isLoading });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    const today = date.year + date.month + date.day;
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const backupMessages = getState().message.messages;
    try {
      await runTransaction(db, async (transaction) => {
        console.group('gpt fetch messages');

        // 1. redux 에서 이전 대화기록 가져오기
        const state = getState();
        const previousMessages = state.message.messages;

        // 2. 현재 Form Input (인자: value)에서 새로운 대화기록 가져오고 대화 내용 업데이트
        const newMessage = {
          "content": values.message,
          "role": "user",
        };
        let updatedMessages = [...previousMessages, newMessage];

        // 3. 업데이트된 대화 기록 가져와서 화면 렌더링하기. = redux state 업데이트 시키기
        dispatch(setMessageAction(updatedMessages));

        // 4. GPT API 호출
        // api 로딩 시작
        dispatch(fetchMessagesLoading(true));

        // gpt 요청 및 응답
        const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
        const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);

        const responseMessage = {
          "content": response.content,
          "role": "assistant",
        };

        // api get 로딩 끝
        dispatch(fetchMessagesLoading(false));

        // 5. 응답받은 대화 추가하고 렌더링하기
        updatedMessages = [...updatedMessages, responseMessage]; // 해당 날짜 전체 메시지
        dispatch(setMessageAction(updatedMessages));

        // 6. POST 데이터 save요청 보내기 
        //transaction.update(docRef, { [day]: updatedMessages });
        postConversationApi(email, today, newMessage.content, responseMessage.content, token);

        //------
        // 이후에 해당 코드는 현재 fetch에서 처리하지말고 다른 함수에서 처리하도록 수정하기
        // 7. 응답받은 대화가 10번째 대화일 경우, 이전 대화 기록을 통해 감정 추출하고 대화 마무리
        if (updatedMessages.length >= CONVERSATION_COUNT) {
          //const docRef = doc(db, `userID/jeong/emotions/${yearMonth}/`);
          const gptEmotionRequestPayload = convertToGptRequestPayloadForEmotion(updatedMessages);

          // ---

          console.log("마지막 대화입니다.");

          const response = await gptApi(gptEmotionRequestPayload).then((response) => JSON.parse(response.choices[0].message.content)); // 대화 감정 추측 결과
          console.log(response);
          
          const emotions = [response.emotion1.emotion, response.emotion2.emotion];
          const reasons = [response.emotion1.reason, response.emotion2.reason];
          const advice = response.advice;
          const scores = [response.emotion1.score, response.emotion2.score];
          postEmotionApi(email, today, advice, emotions, reasons, scores, token);
          /*
          advice : "현재 느끼는 감정을 솔직히 인정하고, 주변 사람들과 대화나 소통을 시도해보세요. 작은 성공 경험이 무기력을 극복하는 데 도움이 될 수 있습니다.",
          emotion1 = {
            emotion : "무기력", 
            reason : "대화가 이어지지 않고 연속으로 같은 반응만 나타나서 사용자가 실패감이나 무기력을 느낄 수 있다고 판단했습니다.",
            score : 8,
                  } 
          emotion2 = { 
            emotion : "불안",
            reason : "스스로 이야기할 내용을 찾지 못해 불안감을 느낄 가능성이 있으며, 이를 통해 소통이 원활하지 않다는 것을 걱정하고 있을 수 있습니다.",
            score : 7
                  }
          */

          //transaction.update(docRef, { [day]: response });
        }

        console.groupEnd();
      });
    } catch (error) {
      dispatch(fetchMessagesLoading(false));
      dispatch(setMessageAction(backupMessages));
      dispatch(errorAction(FETCH_ERROR, "대화를 가져오는 중 에러가 발생했습니다.\n다시 시도해주세요."));
      console.error('Error fetching messages:', error);
    }
  };
};