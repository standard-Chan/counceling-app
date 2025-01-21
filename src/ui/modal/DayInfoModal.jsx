import React from "react";
import styled from "styled-components";
import Card from "../common/Card";
import Text from "../common/Text";
import Spacing from "../common/Spacing";

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
  color: #5c4776;
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

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{contents.date}</ModalTitle>
          <CloseButton onClick={onClose}>close</CloseButton>
        </ModalHeader>
        <ModalContent>
          <Card>
            <Text>{contents.details.emotion1}</Text>
            <Text>{contents.details.emotion2}</Text>
          </Card>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default DayInfoModal;
