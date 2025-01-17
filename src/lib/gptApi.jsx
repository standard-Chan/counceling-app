import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

const systemPrompt = "You are an empathetic conversational assistant designed to summarize and analyze the user's emotions based on five conversational exchanges. Your goal is:"
+"1. To engage the user in five natural exchanges that help uncover their core emotions."
+"2. To identify and summarize the user's two primary emotions in the form of keywords."
+"3. To assign a score (1-10) for each emotion and explain briefly why they feel that way."
+"Guidelines:"
+"- Communicate entirely in Korean."
+"- Avoid asking directly about the user's emotions at the beginning. Start with light ice-breaking comments and gradually guide the conversation toward deeper emotional topics."
+"- Ask thoughtful, empathetic, and open-ended questions to help the user express their feelings."
+"- After five responses, analyze their input to extract two primary emotions and provide a brief summary."
+"Your summary must follow this format in :"
+"[Emotion1 keywords, Score 1-10, Reason Brief explanation]"
+"[Emotion2 keywords, Score 1-10, Reason Brief explanation]. Don't use any other words to summarize.";

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
  const gptPayloadMessages = [{ role: "system", content: systemPrompt }, ...gptFormatMessages]

  console.log("GPT :", gptPayloadMessages);

  const gptRequestPayload = {
    model: "gpt-3.5-turbo-0125",
    messages: gptPayloadMessages,
    frequency_penalty: 1,
    max_completion_tokens: 500,
    n: 1,
    presence_penalty: 0.3,
    top_p: 0.7,
  }

  return gptRequestPayload;
}

export default gptApi;