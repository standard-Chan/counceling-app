import { doc, runTransaction } from "firebase/firestore";
import { conversationCount } from "../constant";
import { getDocument } from "../lib/firebase/readFireStore";
import { updateDocument } from "../lib/firebase/setFireStore";
import gptApi, { convertToGptRequestPayload, convertToGptRequestPayloadForEmotion } from "../lib/gptApi";
import requestDateMessageAction, { setMessageAction } from "./getMessageAction";
import { db } from "../lib/firebase/firebase";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';
export const LOADING_FETCH_MESSAGES = 'chat/LOADING_FETCH_MESSAGES_';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });
export const fetchMessagesLoading = (isLoading) => ({ type: LOADING_FETCH_MESSAGES, payload: isLoading });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    const yearMonth = date.year + date.month;
    const day = date.day;
    const backupMessages = getState().message.messages;
    try {
      await runTransaction(db, async (transaction) => {
        console.group('gpt fetch messages');

        const docPath = `userID/jeong/messages/${yearMonth}`;
        const docRef = doc(db, docPath);

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
        // api get 로딩 시작
        dispatch(fetchMessagesLoading(true));

        const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
        const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);

        const responseMessage = {
          "content": response.content,
          "role": "assistant",
        };

        // api get 로딩 끝
        dispatch(fetchMessagesLoading(false));

        // 5. 응답받은 대화 추가하고 렌더링하기
        updatedMessages = [...updatedMessages, responseMessage];
        dispatch(setMessageAction(updatedMessages));

        // 6. 데이터 transaction에 save하기
        transaction.update(docRef+'test', { [day]: updatedMessages });

        // 이후에 해당 코드는 현재 fetch에서 처리하지말고 다른 함수에서 처리하도록 수정하기
        // 7. 응답받은 대화가 10번째 대화일 경우, 이전 대화 기록을 통해 감정 추출하고 대화 마무리
        if (updatedMessages.length >= conversationCount) {
          const gptEmotionRequestPayload = convertToGptRequestPayloadForEmotion(updatedMessages);
          console.log("마지막 대화입니다.");

          const response = await gptApi(gptEmotionRequestPayload).then((response) => JSON.parse(response.choices[0].message.content));
          transaction.set(`userID/jeong/emotions/${yearMonth}/`, { [day]: response });
        }


        console.groupEnd();
      });
    } catch (error) {
      dispatch(fetchMessagesLoading(false));
      dispatch(setMessageAction(backupMessages));
      console.error('Error fetching messages:', error);
    }
  };
};