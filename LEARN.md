## 실수한 것들

- 전달하는 객체의 구조와 프로퍼티 이름을 제대로 보자.
  잘못된 값을 전달해서 한참 찾았다.

- ... 연산자
  ... 연산자는 앞에 사용해야함. {...state} 를 할 경우 뒤에서 덮어쓰기가 되기때문임.

- 렌더링 되기 전에는 해당 값이 존재하지 않아 렌더링시 에러가 발생할 수 있다. 따라서 해당 값 && 연산자를 사용하여 해당 값의 유무를 확인한 후에 렌더링하도록 습관을 들이자.

## typeScript의 필요성

  - 유지보수 문제

  json-server의 데이터를 REST API로 테스트하다가 firebase로 변경하는 과정에서 번거로움이 발생 => 해당 axios.get을 통해 얻은 데이터가 array인지, 단순 object인지 기억이 안나서, 매번 타입을 확인해야하는 문제점. 따라서 typescript를 통해 유지보수의 속도를 올릴 필요성을 느낌.


## react의 모든 컴포넌트 내부 state 변경
 - 동적 렌더링 구현 가능
  특정 컴포넌트의 내부 state를 변경하려면 해당 컴포넌트에서 정의한 함수를 전달하면 된다. 장거리에서 내부 state를 변경할 수 있기 때문에 higher order로 구현한 ModalContext와 같은 컴포넌트에서 반환되는 Modal JSX를 바꿀 수 있다. 
  

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

#### 미들웨어 없이 할 경우. 다음의 문제가 발생함.
db데이터 가져오는 함수, messages 업데이트 하는 함수. dispatch(객체)를 했을때,
두 함수를 별도로 보관하여 관리해야함.

### 미들웨어를 사용하는 경우, 재사용하기 어려운 문제가 있었음.
request 처리하는 것을 동일하지만, return A라고 고정되어있어서 문제. return B를 해야하는 경우가 발생해서 request는 미들웨어 처리를 하지 않음.

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