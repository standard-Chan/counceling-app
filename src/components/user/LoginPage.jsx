import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import handleLoginApi from "../../lib/springBootApi/login";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e8ff, #fff3cd);
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #5a4a78;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #6b5b95;
  text-align: left;
  width: 20%;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 2px solid #d1c4e9;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #7c60e4;
    box-shadow: 0 0 5px rgba(124, 96, 228, 0.5);
  }
`;

const Button = styled.button`
  background-color: #7c60e4;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #5b46b1;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const token = await handleLoginApi(email, password);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        navigate("/home");
      } else {
        navigate("/login");
        setPassword("");
      }
    },
    [email, password, navigate]
  );

  return (
    <PageContainer>
      <Card>
        <Title>로그인</Title>
        <Form onSubmit={handleLogin}>
          <Row>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Row>
          <Row>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Row>
          <Button type="submit">로그인</Button>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default LoginPage;
