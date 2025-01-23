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

## transaction 처리
  - 여러가지 transaction 처리 방법이 있겠다. 2가지 기능을 고려하였다. 첫번째는 트랜잭션이 동시에 처리되지 않도록하는 기능, 두번째는 도중에 오류가 발생하면 복구가 가능하도록 하는 기능.

  - 동시에 처리하지 못하도록 하는 기능
    1. redux state에 lock 변수를 만들어서 해당 값이 false일때만 처리.
    2. firebase의 runTransaction 이용

  - 데이터 복구 기능
    1. 현재 데이터를 미리 백업시키고, 데이터 받으면 즉시 변경한다. 도중에 에러가 발생하면 백업된 데이터로 복구한다.
    2. 데이터를 받으면 즉시 변경하지 않고 모아두었다가 한번에 변경한다. 데이터가 즉시 변경이 안되므로 렌더링시 한번에 처리된 결과를 봐야한다는 단점이 있다. 또한 마지막에 변경 도중 에러가 발생하면 복구가 불가능하다는 단점이 있다.
    3. firebase의 runTransaction 이용.

    runTransaction을 사용하면 좋지만, 기존 코드가 firebase의 data를 불러와서 렌더링하는 형식으로 되어있어서 도중에 변경된 데이터를 렌더링할 수 없음.

    #### 어떻게 도중에 변경된 사항을 렌더링 할 수 있을까?
    변경된 사항을 redux state에서 불러와서 렌더링하는 것이므로 해당 state message 변수를 도중에 수정하는 방식으로 바꾸어서 렌더링하면 된다.

    #### 결론
    도중에 렌더링이 필요한 데이터들을 firebase에서 가져오지 말고 dispatch하여 변경시키고 firebase의 runTransaction을 이용하여 트랜잭션 처리를 한다. 또한 변경 데이터는 마지막에 한번에 처리한다. 


## Toast를 어떻게 해야하나
  <Toast/>를 특정 시간 이후에 꺼지도록 컴포넌트를 만들었는데, redux state가 error로 바뀔때 해당 <Toast/>를 실행만 시키고 싶다.

  방법 
  1. {display && <Toast/>} 를 한다. => display 변수를 별도로 조정하는 기능을 만들어야함. <Toast/>는 특정 시간 이후 꺼지도록 설계되어있는데 굳이 display 변수를 추가할 이유가 없음.
  2. 함수가 JSX를 return하도록 설계한다. 이게 괜찮은듯 하다. redux의 구독기능은 state 전체의 변경사항을 감지하므로, 개별 state 변경이 되는지를 확인하면서 변경됨을 감지하면 해당 함수를 실행. => 구현이 너무 복잡하다.
  3. Toast에 onClose함수를 추가하여, 해당 함수가 종료될 때 dispatch를 수행하도록 하면 된다. Toast함수는 common component 이므로 dispatch를 넣기 힘들었는데, prop으로 전달하여 상황에 따라 다르게 수행시키면 되므로 이 방법이 가장 적절하다. 또한 한번만 실행하는 것은 <div>{function()}</div>을 이용하여 실행 할 수있다. 렌더링 될때마다 재실행 되겠지만, function() 내부에서 조건문을 달아 재실행 되지 않도록 만들었다.