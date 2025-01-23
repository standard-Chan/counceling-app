import OpenAI from "openai";
import { parsingSep, parsingSepEnd, parsingSepMain } from "../constant";
import { emotionsResponseFormat, systemPromptForConversation, systemPromptForEmotion } from "./gptPrompt";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// gpt api 호출
async function gptApi(gptFormatObject) {
  const completion = await openai.chat.completions.create(gptFormatObject);
  // 반환값
  // console.log(completion);
  return completion;
}

// gpt api 호출을 위한 데이터 포맷 변환
// messages: ex [{role: "user", content: "안녕하세요."}, {role: "assistant", content: "안녕하세요."}]
export function convertToGptRequestPayload(messages) {
  const gptFormatMessages = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  const gptPayloadMessages = [
    { role: "system", content: systemPromptForConversation },
    ...gptFormatMessages,
  ];

  // payload 확인
  // console.log("GPT :", gptPayloadMessages);

  const gptRequestPayload = {
    model: "gpt-3.5-turbo-0125",
    messages: gptPayloadMessages,
    frequency_penalty: 0.7,
    n: 1,
    presence_penalty: 0.7,
    //"temperature": 0.85,
    top_p: 0.5,
  };

  return gptRequestPayload;
}

// 이전 대화를 통해 감정 추출 payload
export function convertToGptRequestPayloadForEmotion(messages) {
  const gptFormatMessages = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  const gptPayloadMessages = [
    { role: "system", content: systemPromptForEmotion },
    ...gptFormatMessages,
  ];
  // payload 확인
  // console.log("GPT :", gptPayloadMessages);
  const gptRequestPayload = {
    model: "gpt-4o-mini",
    messages: gptPayloadMessages,
    response_format: emotionsResponseFormat,
    frequency_penalty: 0,
    n: 1,
    presence_penalty: 0,
    temperature: 1,
    top_p: 1,
  };
  return gptRequestPayload;
}

export default gptApi;
