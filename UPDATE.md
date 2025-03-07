
# 개선 사항
  - 1.15 : UI 컴포넌트 제작
    - [x] common UI (Button, Card, Message, Header, Input, Loader, Spacing, Text, Toast)
  - 1.16 : messages 기능 구현
    - [x] context를 사용한 Form 컴포넌트 구현
    - [x] redux를 사용하여 messages 전송 기능 구현
  - 1.17 : OPEN AI API
    - [ ] OPEN AI API => prompt가 원하는대로 나오지 않아서 테스트만 실시.

  - 1.19 : firebase 연동
    - [x] OPEN AI API 구현
    - [x] firebase 연동
    
  - 1.20 : 데이터 구조 변경
    - calendar에 정보를 표현하기 위해서, 데이터를 month단위로 나눔.
      - messages/년월/일  로 수정. ex messages/202501/11
      - [x] firebase store 저장 방식 변경
      - [x] firebase store 불러오기 방식 변경

  - 1.21 : calendar 출력 데이터 처리
    - [x] 채팅 n회 완료시 채팅 잠금
    - [x] ModalContainer에서 Context API 사용으로 변경
    - [x] 감정 데이터 firebase store 별도로 저장

  - 1.22 : Api GET format에 따른 오류 발생 가능성 수정
    - open ai가 낮은 확률로 다른 format의 데이터를 반환하는 문제 수정
    - [x] open ai system prompt 수정, 반환 형식 Json으로 변경
    
  - 1.23 : chat 로딩 및 transaction 처리
    - [x] firestore GET 로딩 구현
    - [x] chat : api GET 로딩 구현
    - [x] transaction 처리
      - transaction 처리 동안
        - [x] 추가적인 채팅이 불가능 하도록 수정
      - transaction 오류 발생 시
        - [x] transaction 이전으로 복구
        - [x] error 발생시 toast 출력
    - [x] 최소한으로 읽고(GET) 최소한으로 쓰도록(POST, UPDATE) 수정
  
  - 1.25 : UI 변경
    - [x] calendar 대화 결과가 없는 일자 회색 처리
    - [x] chat Input 텍스트 바 width를 채팅 bubble에 맞게 변경

  - 3.5 - 3.6 : api변경
    - [x] firebase 서버에서 spring boot api서버로 변경
      - [x] login, signup, 대화 불러오기, 대화 저장하기 등 구현

  - 3.7 : 페이지 디자인 및 배포 테스트, 버그 수정
    - [x] 로그인페이지 및 회원가입 페이지 디자인
    - [x] 배포 테스트 및 버그 수정