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

## redux 미들웨어
  다음 기능을 위해 사용하였다.

  메시지를 API에 전송하면 즉시 전송한 문자를 화면에 렌더링하고, API 요청을 한 후에 반환받은 요청을 화면에 다시 렌더링 해야한다. 위 과정이 하나의 transaction으로 처리되어야하기 때문에 하나의 함수로 묶어서 관리를 할 필요성을 느꼈다.
  
  ### 다음의 문제상황이 예측되어 미들웨어로 구현

  - 전역처리 없이 하면 props로 전달해야하는 값이 너무 많아서 관리하기 어렵다.
  - GET, POST와 같이 비동기 작업이 많이 사용되기때문에 context api보다 효과적이라고 생각

따라서 미들웨어를 이해하고 잘 활용하기 위해 문서를 정리


#### 미들웨러 처리 순서

큰 순서는 다음과 같다.

1. dispatch(action_object)
2. dispatch로 전달된 action 객체가 미들웨어로 전달된다.


    - action 객체 -> 기본 미들웨어 -> 미들웨어1 -> 미들웨어2

3. 미들웨어 처리가 완료되면 action을 reducer로 전달
4. reducer에서 반환한 값으로 store 업데이트
5. store의 state가 변경됨에 따라서 컴포넌트를 리렌더링

#### 2번 과정을 유심히 살펴보자

미들웨어의 구성은 다음과 같다.

```
  const middlewareA = store => next => action => {
  console.log('dispatching', action);
  const result = next(action); // 다음 미들웨어 또는 reducer로 action 전달
  console.log('next state', store.getState());
  return result;
};
```

- next()함수

  - 다음 미들웨어로 인자 값을 전달해준다.
  - 만약 더이상 미들웨어가 없을 경우, reducer로 전달한다.

- return 값
  - dispatch의 반환값이다. ex. const a = dispatch(A); 일때, a 값

마지막으로 다음 코드의 실행 순서를 예측해보자.

```
  const middlewareA = store => next => action => {
    console.log('dispatching', action);
    const result = next(action); // 다음 미들웨어 또는 reducer로 action 전달
    console.log('next state', store.getState());
    return result;
  }
  const middlewareB = store => next => action => {
    console.log('dispatching', action);
    const result = next(action); // 다음 미들웨어 또는 reducer로 action 전달
    console.log('next state', store.getState());
    return result;
  }
```
#### 실행 순서 (action은 다음과 같이 전달된다)
  1. dispatch(action)
  2. action -> 기본 미들웨어로 전달
  3. 기본미들웨어 -> middlewareA
  4. middlewareA -> middlewareB  (next를 통해서 전달됨)
  5. middlewareB -> reducer  (next를 통해서 전달됨)


#### Modal Components

    - Modal Provider에 JSX 저장. 이후 Provider 제공
    - Modal Provider를 감싸넣은 JSX를 만든다. 그리고 해당 Modal을 띄우고 싶을때, context에 저장된 Modal 변수를 true로 바꿔주면 된다.
    - 위를 위해서는 Modal 변수를 바꿀 수 있는 함수를 context에 저장해두면 된다.

## 채팅 전송 기능

