## 실수한 것들

- 전달하는 객체의 구조와 프로퍼티 이름을 제대로 보자.
  잘못된 값을 전달해서 한참 찾았다.

- ... 연산자
  ... 연산자는 앞에 사용해야함. {...state} 를 할 경우 뒤에서 덮어쓰기가 되기때문임.

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
"userID" : {
  "messages": {
    date : {assistant : [], user: []},
    "20250116" : {
      "user" : [
        {
          "created" : 1736996770,
          "message" : "안녕하세요",
          "role" : "user"
        }, 
        {
          "created" : 1744105203,
          "message" : "오늘 하루는 고되고 힘들었어요. 하지만 행복했어요. 내가 살아 숨쉴수 있다는 것에 감사했죠.",
          "role" : "user"
        }],
      "assistant" : [
        {
          "created" : 1736998921,
          "message" : "오늘하루는 어떤 일이 있었나요?",
          "role" : "assistant"
        }, 
        {
          "created" : 1756912345,
          "message" : "힘들지만 행복함을 느꼈군요. 행복한 이유에 대해서 구체적으로 들을 수 있을까요?",
          "role" : "assistant"
        }]
    }
  }
}
```

completion.choices[0].message.content

## data get

 - [ ] 주소/userID 로 접근
 - [ ] `해당.data.messages.${date}`
