import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io"; // 기존 보내기 버튼
import { PiMailboxBold } from "react-icons/pi"; // 우편함 버튼
import { IoIosMail } from "react-icons/io"; // 메일 버튼
import { IoMdClose } from "react-icons/io";

interface LetterPopupProps {
  onClose: () => void;
  senderName: string;
}

const LetterPopup: React.FC<LetterPopupProps> = ({ onClose, senderName }) => {
  const [content, setContent] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (textareaRef.current) {
        event.preventDefault();
        const lineHeight = parseFloat(
          window.getComputedStyle(textareaRef.current).lineHeight
        );
        textareaRef.current.scrollTop +=
          event.deltaY > 0 ? lineHeight : -lineHeight;
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Write your letter here..."
        />
      </PopupInner>
      <FromText>From. {senderName}</FromText>
      <SendButton onClick={handleSubmit}>
        <IoIosMail />
      </SendButton>
    </Popup>
  );
};

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("/images/letter_background.jpg") no-repeat center center;
  background-size: contain;
  padding: 10px;
  z-index: 1000;
  width: 40vw;
  height: 62vh;
  max-width: 600px;
  max-height: 800px;
  display: block;
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 92%;
  width: 87%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: auto;
  box-sizing: border-box;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-family: "Handwriting", sans-serif;
  font-size: 16px;
  outline: none;
  resize: none;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.8em;
  border-bottom: 1px solid #ccc;
`;

const ToInput = styled.div`
  font-family: "Handwriting", sans-serif;
  font-size: 16px;
  padding-top: 24px;
`;

const SendButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
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
  font-size: 24px;
  padding: 0;

  &:hover {
    color: #ff0000;
  }
`;

const FromText = styled.div`
  position: absolute;
  bottom: 29px;
  right: 67px;
  font-family: "Handwriting", sans-serif;
  font-size: 18px;
`;

export default LetterPopup;
