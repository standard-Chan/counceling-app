
# 개선 사항


  - 1.19 : 
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
    - [ ] firestore GET 로딩 구현
    - [ ] chat : api GET 로딩 구현
    - [ ] transaction 처리
      - transaction 처리 동안
        - [ ] 추가적인 채팅이 불가능 하도록 수정
        - 
      - transaction 오류 발생 시
        - [ ] transaction 이전으로 복구
          간단한 복구 작업이므로 변수 저장을 통한 복구
        - [ ] toast 출력
