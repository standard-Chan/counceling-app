
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

  - 1.22 : 오류 수정
    - [x] open ai system prompt 수정, 반환 형식 Json으로 변경
    