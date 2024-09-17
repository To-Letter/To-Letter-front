import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface LetterPopupProps {
  onClose: () => void;
  senderName: string;
}

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("/images/letter_background.jpg") no-repeat center center;
  background-size: cover;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
  width: 80vw;
  height: 80vh;
  max-width: 600px;
  max-height: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 20px;
  -webkit-overflow-scrolling: touch;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: 10px 5px;
  font-family: "Handwriting", sans-serif;
  font-size: 1.2vw;
  outline: none;
  resize: none;
  overflow: auto;
  white-space: pre-wrap;
  line-height: 1.5em;
  border-bottom: 1px solid #ccc;

  &:focus {
    border-bottom: 1px solid #007bff;
  }
`;

const ToInput = styled.div`
  font-family: "Handwriting", sans-serif;
  font-size: 1.2vw;
  margin-bottom: 10px;
`;

const SendButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 2vw;
  padding: 0;

  &:hover {
    color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 2vw;
  padding: 0;

  &:hover {
    color: #ff0000;
  }
`;

const FromText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "Handwriting", sans-serif;
  font-size: 1.5vw;
`;

const LetterPopup: React.FC<LetterPopupProps> = ({ onClose, senderName }) => {
  const [content, setContent] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Contents:", content);
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (innerRef.current) {
      event.preventDefault();
      innerRef.current.scrollTop += event.deltaY;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <Popup ref={popupRef}>
      <CloseButton onClick={onClose}>
        <IoMdClose />
      </CloseButton>
      <PopupInner ref={innerRef}>
        <ToInput>To.</ToInput>
        <StyledTextarea
          value={content}
          onChange={handleChange}
          placeholder="Write your letter here..."
        />
      </PopupInner>
      <FromText>From. {senderName}</FromText>
      <SendButton onClick={handleSubmit}>
        <IoIosSend />
      </SendButton>
    </Popup>
  );
};

export default LetterPopup;
