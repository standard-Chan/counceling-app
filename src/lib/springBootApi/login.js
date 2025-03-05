import { ApiUrl } from "../../constant";

const handleLoginApi = async (email, password) => {
  const body = JSON.stringify({ email, password });
  const response = await fetch(`${ApiUrl}/user/login`, {
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

export default handleLoginApi;