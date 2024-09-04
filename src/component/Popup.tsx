import React, { useEffect } from "react";
import { Html } from "@react-three/drei";
import { usePopup } from "./PopupContext";
import styled from "styled-components";

interface PopupProps {
  text: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ text, onClose }) => {
  const { setActivePopup } = usePopup();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".popup") === null) {
        setActivePopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActivePopup]);

  return (
    <Html center>
      <PopupContainer className="popup">
        <PopupHeader className="popup-header">
          <CloseButton className="close-button" onClick={onClose}>
            X
          </CloseButton>
        </PopupHeader>
        <PopupContent className="popup-content">
          <p>{text}</p>
        </PopupContent>
      </PopupContainer>
    </Html>
  );
};

export default Popup;

// Styled-components
const PopupContainer = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupHeader = styled.div`
  background-color: black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: white;
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  height: 40px;
`;

const PopupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
