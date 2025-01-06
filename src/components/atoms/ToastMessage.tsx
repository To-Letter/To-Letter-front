"use client";

import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface ToastMessageProps {
  message: string;
  duration?: number; // 메시지가 표시되는 시간 (기본값: 3초)
  onClose: () => void;
}

interface ToastContainerProps {
  duration: number;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <ToastContainer duration={duration}>{message}</ToastContainer>;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  margin: auto;
  width: max-content;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out,
    ${fadeOut} 0.5s ease-in-out ${({ duration }) => duration - 500}ms;
  z-index: 1000;
`;

export default ToastMessage;
