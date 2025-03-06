import { ApiUrl } from "../../constant";


/*
{
    "userEmail" : "123@naver.com",
    "date" : "20240305",
    "emotions" : ["설렘", "아픔"],
    "reasons" : ["내일도 살아갈 수 있다는 사실에 설렙니다.", "공부를 오래해서 허리가 아픕니다."],
    "scores" : [6, 5]
}
*/
// 감정 기록 결과 저장하기
export const postEmotionApi = async (userEmail, date, advice, emotions, reasons, scores, token) => {
  const response = await fetch(`${ApiUrl}/emotion/result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include", // (cors)쿠키를 주고받기 위해 필요
    body: JSON.stringify({
      userEmail,
      date,
      advice,
      emotions,
      reasons,
      scores
    })
  }).then(response => {
    if (!response.ok) {
      alert(`대화 결과 요청이 실패하였습니다. HTTP error! Status: ${response.status}`);
      return false;
    }
    return response.json();
  })
    .catch(error => {
      alert(`대화 결과 저장이 실패하였습니다. 다시 시도해주세요. [ERROR] : ${error}`);
      return false;
    });
  return response;
}

// get 감정 기록 결과 불러오기 (day)
/*
response
{
    "userEmail" : "123@naver.com",
    "date" : "20240305",
    "advice" : "휴식이 필요해보여요",
    "emotions" : ["설렘", "아픔"],
    "reasons" : ["내일도 살아갈 수 있다는 사실에 설렙니다.", "공부를 오래해서 허리가 아픕니다."],
    "scores" : [6, 5]
}
*/
export const getDayEmotionApi = async (userEmail, date, token) => {
  const response = await fetch(`${ApiUrl}/emotion/result/day?email=${userEmail}&date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include", // (cors)쿠키를 주고받기 위해 필요
  }).then(response => {
    if (!response.ok) {
      alert(`대화 결과 요청이 실패하였습니다. HTTP error! Status: ${response.status}`);
      return false;
    }
    return response.json();
  })
    .catch(error => {
      alert(`대화 결과 저장이 실패하였습니다. 다시 시도해주세요. [ERROR] : ${error}`);
      return false;
    });
  return response;
}

// 감정 기록 결과 가져오기 (month)
/*
response
[{
    "userEmail" : "123@naver.com",
    "date" : "20240305",
    "advice" : "휴식이 필요해보여요",
    "emotions" : ["설렘", "아픔"],
    "reasons" : ["내일도 살아갈 수 있다는 사실에 설렙니다.", "공부를 오래해서 허리가 아픕니다."],
    "scores" : [6, 5]
}, {
    "userEmail" : "123@naver.com",
    "date" : "20240306",
    "advice" : "스퍼하지마요",
    "emotions" : ["즐거움", "기쁨"],
    "reasons" : ["배우는 즐거움을 느낍니다..", "친구와 함께해서 기쁩니다."],
    "scores" : [2, 5]
}, {...}]
*/
export const getMonthEmotionApi = async (email, date, token) => {
  const response = await fetch(`${ApiUrl}/emotion/result/month?email=${email}&date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include", // (cors)쿠키를 주고받기 위해 필요
  }).then(response => {
    if (!response.ok) {
      alert(`대화 결과 요청이 실패하였습니다. HTTP error! Status: ${response.status}`);
      return false;
    }
    return response.json();
  })
    .catch(error => {
      alert(`대화 결과 저장이 실패하였습니다. 다시 시도해주세요. [ERROR] : ${error}`);
      return false;
    });
  return response;
}