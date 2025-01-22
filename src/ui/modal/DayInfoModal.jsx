import React from "react";
import styled from "styled-components";
import Card from "../common/Card";
import Text from "../common/Text";
import Spacing from "../common/Spacing";
import ContentCard from "../common/ContentCard";
import Header from "../common/Header";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #f3e8ff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  max-width: 90%;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1c4e9;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #5c4776;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #8c65bd;
  cursor: pointer;
  &:hover {
    color: #b39ddb;
  }
`;

const ModalContent = styled.div`
  font-size: 16px;
  color: #5c4776;
`;

const DayInfoModal = ({ children, contents, onClose }) => {
  console.log(contents.details);
  const { date, details } = contents;
  const { emotion1, emotion2, advice } = details;
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{date}</ModalTitle>
          <CloseButton onClick={onClose}>close</CloseButton>
        </ModalHeader>
        <ModalContent>
          <Card flexDirection={"column"} bgColor={"#fffff00"} borderColor={"#fffff00"}>
            <ContentCard keyword={`${emotion1.emotion}(${emotion1.score}/10)`} content={emotion1.reason}/>
            <Spacing top={'20px'} />
            <ContentCard keyword={`${emotion2.emotion}(${emotion2.score}/10)`} content={emotion2.reason}/>
          </Card>
          <Spacing top={'20px'} />
          <Card flexDirection={"column"} bgColor={"#fffdd083"} borderColor={"#fffff00"}>
            <Text>{advice}</Text>
          </Card>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};


export default DayInfoModal;
