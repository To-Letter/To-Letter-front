import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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
          spellCheck={false}
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
  width: 700px;
  max-height: 700px;
  display: block;
  background-size: cover;

  @media (min-height: 501px) and (max-height: 800px) {
    width: 500px;
    height: 500px;
    background-size: cover;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    height: 700px;
    background-size: cover;
  }
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  /* width: 87%; */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: auto;
  box-sizing: border-box;

  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
    height: 500px;
    padding: 20px 30px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    padding: 30px 44px;
    height: 800px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 582px;
  border: none;
  background: transparent;
  font-family: "Handwriting", sans-serif;
  font-size: 16px;
  outline: none;
  resize: none;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 34.5px;


  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
    font-size: 14px;
    line-height: 24.5px;
    height: 412px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 16px;
    line-height: 34.5px;
    height: 586px;
  }
`;

const ToInput = styled.div`
  font-family: "Handwriting", sans-serif;
  font-size: 16px;

  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
  font-size: 16px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 18px;
  }
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