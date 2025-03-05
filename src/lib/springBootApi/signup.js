import { ApiUrl } from "../../constant";


const handleSignupApi = async (email, password) => {
  const body = JSON.stringify({ email, password });
  try {
    const response = await fetch(`${ApiUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body,
    });

    if (!response.ok) {
      throw new Error("회원가입이 실패하였습니다. 다시 시도해주세요");
    }

    alert("회원가입이 완료되었습니다.");
  } catch (err) {
    alert(err);
  }
};

export default handleSignupApi;