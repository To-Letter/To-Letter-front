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

  const handleWheel = (event: WheelEvent) => {
    if (innerRef.current) {
      event.preventDefault();
      innerRef.current.scrollTop += event.deltaY;
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (textareaRef.current) {
        event.preventDefault();
        textareaRef.current.scrollTop += event.deltaY;
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
  background: url("/images/letter_background2.jpg") no-repeat center center;
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
  width: 87%;
  height: 100%;
  border: none;
  background: transparent;
  /* padding: 10px 5px; */
  font-family: "Handwriting", sans-serif;
  font-size: 1.2vw;
  outline: none;
  resize: none;
  overflow-y: auto; /* 세로 스크롤 추가 */
  white-space: pre-wrap;
  line-height: 1.7em;
  border-bottom: 1px solid #ccc;
  margin: 0% 7.5%; /* 양쪽에서 동일하게 줄어들도록 설정 */

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
  bottom: 29px;
  right: 67px;
  font-family: "Handwriting", sans-serif;
  font-size: 1.5vw;
`;

export default LetterPopup;
