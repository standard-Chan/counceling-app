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
  const { date, details } = contents;
  const { emotions, reasons, scores, advice } = details;
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{date}</ModalTitle>
          <CloseButton onClick={onClose}>close</CloseButton>
        </ModalHeader>
        <ModalContent>
          <Card backgroundColor={"#fffff00"} borderColor={"#fffff00"}>
            <ContentCard keyword={`${emotions[0]}(${scores[0]}/10)`} content={reasons[0]}/>
            <Spacing top={'20px'} />
            <ContentCard keyword={`${emotions[1]}(${scores[1]}/10)`} content={reasons[1]}/>
          </Card>
          <Spacing top={'20px'} />
          <Card flexDirection={"column"} backgroundColor={"#fffdd083"} borderColor={"#fffff00"}>
            <Text>{advice}</Text>
          </Card>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};


export default DayInfoModal;
