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
const emotionApi = async (email, date, emotions, reasons, scores) => {
  const body = JSON.stringify({
    userEmail: email,
    date,
    emotions,
    reasons,
    scores
  });
  const response = await fetch(`${ApiUrl}/api/emotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // (cors)쿠키를 주고받기 위해 필요
    body: body,
  }).then(response => {
    if (!response.ok) {
      alert("이메일/비밀번호가 올바르지 않습니다. 다시 시도해주세요");
      return false;
    }
    return response.json(); // 응답을 JSON으로 변환 (JWT 토큰)
  }).catch(error => {
    alert("로그인중 에러가 발생했습니다. 다시 시도해주세요.");
    return false;
  });
  return response.token; // jwt 토큰 반환
}