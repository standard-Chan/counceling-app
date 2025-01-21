import { conversationCount, parsingSep, parsingSepMain } from "../constant";
import { getDocument } from "../lib/firebase/readFireStore";
import { createDocumentNotExisted, setDocument, updateDocument } from "../lib/firebase/setFireStore";
import gptApi, { convertToGptRequestPayload } from "../lib/gptApi";
import { parseString } from "../lib/parser";
import requestDateMessageAction from "./getMessageAction";

export const FETCH_MESSAGES = 'chat/FETCH_MESSAGES';

export const fetchMessagesAction = (messages) => ({ type: FETCH_MESSAGES, payload: messages });

export const fetchMessagesThunk = (values, date) => {
  return async (dispatch, getState) => {
    try {
      console.log("date", date);
      const yearMonth = date.year + date.month;
      const day = date.day;
      console.group('gpt fetch messages thunk');
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

      // 6. GPT API 호출
      const gptRequestPayload = convertToGptRequestPayload(updatedMessages);
      console.log("지피티 페이로드 : ", gptRequestPayload);
      const response = await gptApi(gptRequestPayload).then((response) => response.choices[0].message);

      let responseMessage = {};

      // 6-1. 응답받은 대화가 10번째 대화일 경우. 결과와 대화내용 파싱 및 감정 저장.
      if (updatedMessages.length >= conversationCount-1) {
        console.log("10번째 대화입니다.");
        const responseString = parseString(response.content, parsingSepMain);
        const content = responseString[0];
        const emotion1 = parseString(responseString[1], parsingSep);
        const emotion2 = parseString(responseString[2], parsingSep);
        
        console.log('콘텐츠 : ', content);
        console.log('감정1 : ', emotion1, emotion2);
        // emotion을 firestore에 새로 만들어 저장하기.
        // 해당 document가 없으면 생성하고, 있으면 업데이트하기.
        //createDocumentNotExisted(`userID/jeong/emotions/`, yearMonth);
        setDocument(`userID/jeong/emotions/${yearMonth}/`, { [day]: {emotion1, emotion2}});


        responseMessage = {
          "content": content,
          "role": "assistant",
        };
        console.log(responseMessage);
      }

      else {
        responseMessage = {
          "content": response.content,
          "role": "assistant",
        };
        console.log(responseMessage);
      }

      // 7. 응답받은 대화 추가하고, db에 저장하기 API 데이터 호출하기
      updatedMessages = [...updatedMessages, responseMessage];
      updateDocument(`userID/jeong/messages/${yearMonth}/`, { [day]: updatedMessages });

      // 8. 저장된 데이터 가져와서 렌더링하기
      dispatch(requestDateMessageAction(date));

      console.groupEnd();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
};