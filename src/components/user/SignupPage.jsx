import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleSignupApi from "../../lib/springBootApi/signup";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = useCallback((e) => {
    e.preventDefault();
    // 회원가입 API 호출
    handleSignupApi(email, password);
    // home으로 이동
    navigate("/home");
  }, [email, password, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
