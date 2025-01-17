## 실수한 것들

- 전달하는 객체의 구조와 프로퍼티 이름을 제대로 보자.
  잘못된 값을 전달해서 한참 찾았다.

- ... 연산자
  ... 연산자는 앞에 사용해야함. {...state} 를 할 경우 뒤에서 덮어쓰기가 되기때문임.

- 렌더링 되기 전에는 해당 값이 존재하지 않아 렌더링시 에러가 발생할 수 있다. 따라서 해당 값 && 연산자를 사용하여 해당 값의 유무를 확인한 후에 렌더링하도록 습관을 들이자.

# API 데이터 설계

#### 다음의 형태로 데이터가 전송됨.

```
  completion :
    {
    id: 'chatcmpl-AqAUsU2F9EAVmXigbtreePJ2jc9yX',
    object: 'chat.completion',
    created: 1736996770,
    model: 'gpt-4-0613',
    choices: [
      {
        index: 0,
        message: [Object],
        logprobs: null,
        finish_reason: 'length'
      }
    ],
    usage: {
      completion_tokens: 500,
      total_tokens: 1748,
      prompt_tokens_details: { cached_tokens: 1152, audio_tokens: 0 },
      completion_tokens_details: {
        reasoning_tokens: 0,
        audio_tokens: 0,
        accepted_prediction_tokens: 0,
        rejected_prediction_tokens: 0
      }
    },
    service_tier: 'default',
    system_fingerprint: null
  }
```

#### 사용할 데이터

```
  //completion.choices[0].message

  message: {
  role: 'assistant',
  content: '안녕하세요',
  refusal: null
}
```

created : 생성된 날짜
role : assistant
content : 메세지

다음의 데이터로 변경하여 저장

```
"userID": {
  "messages": {
    "20250116": [
      {
        "created": 1736996770,
        "content": "안녕하세요",
        "role": "user"
      },
      {
        "created": 1736998921,
        "content": "오늘하루는 어떤 일이 있었나요?",
        "role": "assistant"
      },
      {
        "created": 1744105203,
        "content": "오늘 하루는 고되고 힘들었어요. 하지만 행복했어요. 내가 살아 숨쉴수 있다는 것에 감사했죠.",
        "role": "user"
      },
      {
        "created": 1756912345,
        "content": "힘들지만 행복함을 느꼈군요. 행복한 이유에 대해서 구체적으로 들을 수 있을까요?",
        "role": "assistant"
      }
    ]
  }
}
```

completion.choices[0].message.content

## data get

 - [ ] 주소/userID 로 접근
 - [ ] `해당.data.messages.${date}`

#### Modal Components
    - Modal Provider에 JSX 저장. 이후 Provider 제공
    - Modal Provider를 감싸넣은 JSX를 만든다. 그리고 해당 Modal을 띄우고 싶을때, context에 저장된 Modal 변수를 true로 바꿔주면 된다. 
    - 위를 위해서는 Modal 변수를 바꿀 수 있는 함수를 context에 저장해두면 된다.


## 채팅 전송 기능

  1. INPUT입력 후 submit => chatGPT API로 해당 데이터 전송
    - api로 전송할 데이터를 만든다.
      0. db에 있는 message 데이터 가져오기
      1. action (message)
      2. reducer (action.message) => 아래와 같이 messages를 업데이트 (db message + action.message)
      ```
        {role: "user", content: action.message} 
      ```
      3. 

  2. 수신한 데이터를 db에 post하여 저장

  api로 전송할 데이터는 다음과 같은 구조이어야한다.
  async function gpt() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {role: "system", content: systemPrompt },
      {role:"assistant", content: 질문},
      {role:"user", content: 답변},
      {role:"assistant", content: 질문},
      {role:"user", content: 답변},
    ],
    // 같은 말 반복 방지
    frequency_penalty: 1,
    // 최대 토큰
    max_completion_tokens: 500,
    // 생성하는 결과 개수
    n: 1,
    // 새로운 주제에 대해 이야기 가능성: 이전에 말했던 텍스트에 나타났는지 여부에 따라 패널티 (-2.0 ~ 2.0)
    presence_penalty: 0.3,
    // 응답 형식
    //response_format
    // 창의적인 답변
    //temperature:0.7,
    // 확률적으로 상위에 위치한 답변 (temperature와 같이 사용하지 말것)
    top_p: 0.7,
  });
  console.log(completion.choices[0].message);
  console.log(completion); 
}