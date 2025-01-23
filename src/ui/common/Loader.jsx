import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoaderSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #dcd6f7;
  border-radius: 50%;
  width: ${(props) => props.size || '50px'};
  height: ${(props) => props.size || '50px'};
  animation: ${spin} 2s linear infinite;
`;

const Loader = ({ size }) => {
  return (
    <LoaderWrapper>
      <LoaderSpinner size={size} />
    </LoaderWrapper>
  );
};

export default Loader;