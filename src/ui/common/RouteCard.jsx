import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #5a4a78;
`;

const Button = styled.button`
  background: #f3e8ff;
  color: #5a4a78;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  margin-top: 16px;

  &:hover {
    background: #dcc2f8;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #6b5b95;
  margin-bottom: 20px;
`;

const RouteCard = ({ title, text, path, btn }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title>{title}</Title>
      <Description>{text}</Description>
      <Button onClick={() => navigate(path)}>{btn}</Button>
    </Card>
  );
};

export default RouteCard;
