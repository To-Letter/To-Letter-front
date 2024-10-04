import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface ToastMessageProps {
  message: string;
  duration?: number; // 메시지가 표시되는 시간 (기본값: 3초)
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 메시지를 일정 시간 후에 사라지게 하는 로직
      const toast = document.getElementById("toast-message");
      if (toast) {
        toast.style.display = "none";
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return <ToastContainer id="toast-message">{message}</ToastContainer>;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  z-index: 1000;
`;

export default ToastMessage;
