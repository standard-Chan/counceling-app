import React from 'react';
import styled from 'styled-components';
import { FaSmileBeam } from "react-icons/fa";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  max-width: 800px;
`;

const Keyword = styled.div`
  font-size: 15px;
  padding: 3px;
  color: #5c4776;
  background: #ffffff;
`;

const Score = styled.div`
  font-size: 20px;
  margin: 0 20px;
  color: #5c4776;
`;

const Content = styled.p`
  font-size: 14px;
  margin: 0 0 0 20px;
  color: #5c4776;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
`;

const EmotionIcon = styled(FaSmileBeam)`
  color: #b69b05; /* 노란색 */
  font-size: 40px;
`;

const ContentCard = ({ keyword, score, content }) => {
  return (
    <CardContainer>
      <EmotionIcon/>
      <Keyword>{"EMOTICON"}</Keyword>
      <Content>{content}</Content>
    </CardContainer>
  );
};

export default ContentCard;