# 심리 상담 APP

## Components
  # UI components
  
  - /common: 공용 UI 컴포넌트.
    - Button: 버튼 UI.
    - Text: 텍스트 입력
    - Input: 텍스트 입력 필드.
    - Avatar: 사용자/AI의 프로필 이미지.
    - Loader: 로딩 스피너.
    - Card: 정보 카드
    - Toast: 알림표시
    - Divider: UI 구분하는 선
    - Spacing: 컴포넌트 사이 공간
    - Form: Provider form
  - /Modal: Modal 관련 UI 컴포넌트
    - Modal: 모달 창.
  - /layout: 페이지 레이아웃 관련 UI 컴포넌트.
    - Header.js: 상단바.
    - Footer.js: 하단바.
    - Sidebar.js: 좌측 또는 우측 메뉴.
  - /chat: 채팅과 관련된 UI 컴포넌트.
    - ChatBubble.js: 사용자/AI의 대화 말풍선.
    - ChatInput.js: 채팅 입력 필드.
    - ChatLoader.js: 채팅 생성 로딩

  # components
    - redux Action, reducers
      - api 응답 처리

# 보완해야할 점
  ## firebase
  - firestore document의 특정 데이터만 사용하고 싶은데, document에 데이터가 너무 많은 경우
    - firebase는 document 데이터 전체를 가져오는 기능밖에 없기 때문에 속도가 느려질 수 있다.따라서 특정 document에 있는 데이터를 효과적으로 나누어 저장해야 한다.
    - 1. document name을 날짜로 변환하는 방법

  ## OPEN AI 
   PROMPT 개선사항
  
  - 사용자의 취향을 고려하여, ex. MBTI 등의 정보를 assistant에 전달하면 더욱 좋은 대화 가능.
