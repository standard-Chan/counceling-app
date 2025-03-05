
// 대화(user, assistant) 저장 API
export const postConversationApi = async (email, date, userMessage, assistantMessage, token) => {
  const response = fetch("http://localhost:8080/api/emotion/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      email,
      date,
      userMessage,
      assistantMessage
    })
  })
    .then(response => {
      if (!response.ok) {
        alert(`대화 전송이 실패하였습니다. 다시 시도해주세요. HTTP error! Status: ${response.status}`);
        return false;
      }
      return response.json();
    })
    .catch(error => {
      alert(`대화 저장이 실패하였습니다. 다시 시도해주세요. [ERROR] : ${error}`);
      return false;
    });
  return response;
}


// 대화 불러오기 API
export const getConversationApi = async (email, date, token) => {
  const response = fetch(`http://localhost:8080/api/emotion/conversation?email=${email}&date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        alert(`대화 불러오기가 실패하였습니다. 다시 접속해주세요. HTTP error! Status: ${response.status}`);
        return false;
      }
      return response.json(); // 응답을 JSON으로 변환
    })
    .catch(error => {
      alert(`대화 불러오기가 실패하였습니다. 다시 접속해주세요. [ERROR] : ${error}`);
      return false;
    });
  return response;
}