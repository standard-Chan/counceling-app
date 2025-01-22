

## response 구조 설정

open ai의 response 구조를 지정할 수 있다. 총 2가지 방법이 있다.

1. JSON 모드
2. structured output

다만, JSON 모드의 경우에는 낮은 확률로 JSON 구조를 반환하지 않는 경우도 있으므로 structured output을 사용하는 것을 권장한다.
structured output은 gpt-4o-mini, gpt-4o 이후 모델에만 호환되니 참고할 것

### structured output

#### 지정 방법
open ai의 response의 구조를 지정할 수 있다.

```
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const userSchema = z.object({
  name: z.string(),
  age: z.number().int(),
  email: z.string().email(),
});

const responseFormat = zodResponseFormat(userSchema, 'UserSchema');

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Please provide a user profile.' },
  ],
  response_format: responseFormat,
});

const userProfile = response.choices[0].message.parsed;
console.log(userProfile);

```

#### 관련 함수

- zod : open ai 에서 제공하는 lib
- zodResponseFormat : openAI 응답 혁식으로 변환해주는 함수

#### 지원 타입
- String
- Number
- Boolean
- Integer
- Object
- Array
- Enum
- anyOf

https://platform.openai.com/docs/guides/structured-outputs?context=ex1#supported-schemas