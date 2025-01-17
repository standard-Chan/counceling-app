import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

// gpt api 호출
async function gptApi(gptFormatObject) {
  const completion = await openai.chat.completions.create(gptFormatObject);
  console.log(completion.choices[0].message);
  console.log(completion);
  return completion;
}

// gpt api 호출을 위한 데이터 포맷 변환
// messages: ex [{role: "user", content: "안녕하세요."}, {role: "assistant", content: "안녕하세요."}]
export function convertToGptRequestPayload (messages) {
  const gptFormatMessages = messages.map((message) => (
    {
      role: message.role,
      content: message.content,
    }
  ));

  console.log(gptFormatMessages);

  const gptRequestPayload = {
    model: "gpt-3.5-turbo-0125",
    messages: gptFormatMessages,
    frequency_penalty: 1,
    max_completion_tokens: 500,
    n: 1,
    presence_penalty: 0.3,
    top_p: 0.7,
  }

  return gptRequestPayload;
}

export default gptApi;