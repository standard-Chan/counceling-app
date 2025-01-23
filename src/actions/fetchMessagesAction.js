import { conversationCount } from "../constant";
import { getDocument } from "../lib/firebase/readFireStore";
import { updateDocument } from "../lib/firebase/setFireStore";
import gptApi, { convertToGptRequestPayload, convertToGptRequestPayloadForEmotion } from "../lib/gptApi";
import requestDateMessageAction from "./getMessageAction";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';
export const LOADING_FETCH_MESSAGES = 'chat/LOADING_FETCH_MESSAGES_';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });
export const fetchMessagesLoading = (isLoading) => ({ type: LOADING_FETCH_MESSAGES, payload: isLoading });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    try {
      const yearMonth = date.year + date.month;
      const day = date.day;
      console.group('gpt fetch messages');
      // 1. db에서 이전 대화기록 가져오기
      const previousMessages = await getDocument(`userID/jeong/messages/${yearMonth}`).then((response) => {
        // 새로운 대화기록
        if (!(day in response)) {
          console.log('새로운 대화를 시작합니다.');
          return ([]);
        }
        // 기존 대화기록
        return response[day];
      });

      // 2. 현재 Form에서 새로운 대화기록 가져오기
      const newMessage = {
        "content": values.message,
        "role": "user",
      };
      // 3. 대화기록 업데이트
      let updatedMessages = [...previousMessages, newMessage];

      // 4. db에 새로운 업데이트된 대화로 갱신하기 => 해당 데이터 추가하기.
      updateDocument(`userID/jeong/messages/${yearMonth}/`, { [day]: updatedMessages });

      // 5. db에서 대화 기록 가져와서 화면 렌더링하기. = redux state 업데이트 시키기
      dispatch(requestDateMessageAction(date));

      // api get 로딩 시작
      dispatch(fetchMessagesLoading(true));
      // 6. GPT API 호출
      const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
      const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);

      const responseMessage = {
        "content": response.content,
        "role": "assistant",
      };

      // 7. 응답받은 대화 추가하고, db에 저장하기 API 데이터 호출하기
      updatedMessages = [...updatedMessages, responseMessage];
      updateDocument(`userID/jeong/messages/${yearMonth}/`, { [day]: updatedMessages });
      // api get 로딩 끝
      dispatch(fetchMessagesLoading(false));

      // 8. 저장된 데이터 가져와서 렌더링하기
      dispatch(requestDateMessageAction(date));

      // 9. 응답받은 대화가 10번째 대화일 경우, 이전 대화 기록을 통해 감정 추출하고 대화 마무리
      if (updatedMessages.length >= conversationCount) {
        const gptEmotionRequestPayload = convertToGptRequestPayloadForEmotion(updatedMessages);
        console.log("마지막 대화입니다.");

        const response = await gptApi(gptEmotionRequestPayload).then((response) => JSON.parse(response.choices[0].message.content));
        console.log('감정 결과 : ', response);
        console.log("emotion1 : ", response.emotion1);
        updateDocument(`userID/jeong/emotions/${yearMonth}/`, { [day]: response });
      }


      console.groupEnd();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
};