import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.bgColor || '#dcd6f7'};
  color: ${props => props.color || '#4a4a4a'};
  padding: ${props => props.padding || '16px 24px'};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => (props.show ? 1 : 0)};
  transform: ${props => (props.show ? 'translateX(-50%)' : 'translateX(-50%) translateY(20px)')};
`;

const Toast = ({ message, show, duration = 3000, bgColor, color, padding, onClose }) => {

  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <ToastContainer
      bgColor={bgColor}
      color={color}
      padding={padding}
      show={visible}
    >
      {message}
    </ToastContainer>
  );
};

export default Toast;