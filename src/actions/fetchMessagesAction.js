import { Api } from "../lib/Api";
import { getDocument } from "../lib/firebase/readFireStore";
import { setDocument, updateDocument } from "../lib/firebase/setFireStore";
import gptApi, { convertToGptRequestPayload } from "../lib/gptApi";
import requestMessageAction from "./getMessageAction";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    try {

      console.group('gpt fetch messages thunk');
      // 1. db에서 이전 대화기록 가져오기
      const previousMessages = await getDocument("userID/jeong/messages/jeong-messages").then((response) => {
        // 새로운 대화기록
        if (!(date in response)){
          console.log('새로운 대화를 시작합니다.');
          return ([]);
        }
        // 기존 대화기록
        return response[date];
      });

      // 2. 현재 Form에서 새로운 대화기록 가져오기
      const newMessage = {
        "content": values.message,
        "role": "user",
      };
      // 3. 대화기록 업데이트
      let updatedMessages = [...previousMessages, newMessage];

      // 4. db에 새로운 업데이트된 대화로 갱신하기 => 해당 데이터 추가하기.
      updateDocument(`userID/jeong/messages/jeong-messages/`, {[date] : updatedMessages});

      // 5. db에서 대화 기록 가져와서 화면 렌더링하기. = redux state 업데이트 시키기
      dispatch(requestMessageAction(date));

      // 6. GPT API 호출
      const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
      console.log("지피티 페이로드 : ",gptRequestPayload);
      const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);
      const responseMessage = {
        "content": response.content,
        "role": "assistant",
      };
      console.log(responseMessage);

      // 7. 응답받은 대화 추가하고, db에 저장하기 API 데이터 호출하기
      updatedMessages = [...updatedMessages, responseMessage];
      updateDocument(`userID/jeong/messages/jeong-messages/`, {[date] : updatedMessages});

      // 8. 저장된 데이터 가져와서 렌더링하기
      dispatch(requestMessageAction(date));

      console.groupEnd();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
};