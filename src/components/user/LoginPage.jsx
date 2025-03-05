import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLoginApi from "../../lib/springBootApi/login";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = useCallback(async (e) => {
    e.preventDefault();
    // 로그인 API 호출
    const token = await handleLoginApi(email, password);
    // jwt localStorage에 저장
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      navigate("/home");
    }
    else {
      navigate("/login");
      setEmail("");
    }
  }, [email, password, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage