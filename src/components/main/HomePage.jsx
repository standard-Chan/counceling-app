import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RouteCard from "../../ui/common/RouteCard";
import Spacing from "../../ui/common/Spacing";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #e9d5ff, #fef3c7);
  padding: 40px 20px;
`;

const HomePageCard = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #4a356d;
`;

const Description = styled.p`
  font-size: 18px;
  color: #5e4b89;
  margin-bottom: 28px;
`;

const Button = styled.button`
  background-color: ${(props) => props.bgcolor || "#8b5cf6"};
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => props.hovercolor || "#6d28d9"};
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  width: 100%;
`;

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("key");
    setIsAuthenticated(false);
    navigate("/home");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <PageContainer>
            <Spacing top={"200px"} />
      <HomePageCard>
        <Title>Emotion Diary</Title>
        <Description>
          매일의 감정을 기록하고 분석하세요. 나만의 감정 다이어리를 만들어 보세요!
        </Description>
        {!isAuthenticated && (
          <ButtonGroup>
            <Button onClick={() => navigate("/login")}>로그인</Button>
            <Button onClick={() => navigate("/signup")} bgcolor="#4caf50" hovercolor="#388e3c">
              회원가입
            </Button>
          </ButtonGroup>
        )}
      </HomePageCard>
      {isAuthenticated && (
        <CardContainer>
          <RouteCard
            title="Emotion Diary"
            text="대화를 통해 매일매일의 감정을 기록해보세요."
            path="/main"
            btn="대화하기"
          />
          <RouteCard
            title="My INFO"
            text="그동안 기록한 감정을 확인해보세요"
            path="/info"
            btn="나의 정보"
          />
          <Button onClick={handleLogout} bgcolor="#ff6b6b" hovercolor="#d94343">
            로그아웃
          </Button>
        </CardContainer>
      )}
      <Spacing top={"200px"} />
    </PageContainer>
  );
};

export default HomePage;