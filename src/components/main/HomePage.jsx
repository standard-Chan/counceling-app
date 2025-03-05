import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // login 여부 확인
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home")
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">웹 페이지 소개</h1>
      <p className="text-gray-700">
        이 웹사이트는 최신 기술을 활용하여 사용자에게 최고의 경험을 제공합니다.
      </p>

      {isAuthenticated ? (
        <button
          onClick={() => handleLogout()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
      ) : (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
