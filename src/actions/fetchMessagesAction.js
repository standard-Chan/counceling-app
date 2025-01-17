import { Api } from "../lib/Api";
import gptApi, { convertToGptRequestPayload } from "../lib/gptApi";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    try {
      // 1. db에서 이전 대화기록 가져오기
      const previousMessages = await Api.get('/userID', { params: { key: 'messages' } }).then((response) => response.data.messages[date]);;
      console.log(date);

      // 2. Form에서 새로운 대화기록 가져오기
      const newMessage = {
        "content": values.message,
        "role": "user",
      };

      // 3. 대화기록 업데이트
      let updatedMessages = [...previousMessages, newMessage];

      console.log(updatedMessages);
      // 4. db에 새로운 대화로 추가하기
      //await Api.post("/20250116", updatedMessages)

      // 5. db에서 대화 기록 가져와서 화면 렌더링하기.

      // 6. GPT API 호출
      const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
      console.log(gptRequestPayload);
      const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);

      console.log(response);

      // 7. 응답받은 대화 추가하고, db에 저장하기 API 데이터 호출하기
      updatedMessages = [...updatedMessages, response];
      //await Api.post(`${date}`, updatedMessages );

      // 8. 저장된 데이터 가져와서 렌더링하기
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
};