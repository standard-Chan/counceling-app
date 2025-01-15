import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #dcd6f7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderSpinner />
    </LoaderWrapper>
  );
};

export default Loader;