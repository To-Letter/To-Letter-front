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
  width: 40vw;
  height: calc(100vh - 20vh);
  max-width: 600px;
  max-height: 800px;
  display: block;

  @media (max-width: 500px) {
    width: 80vw;
    height: 70vh;
    background-size: cover; // 화면 크기에 맞게 이미지 크기 조절
  }

  @media (min-width: 501px) and (max-width: 800px) {
    width: 75vw;
    height: 70vh;
    background-size: cover;
  }

  @media (min-width: 801px) and (max-width: 1280px) {
    width: 70vw;
    height: 70vh;
    background-size: cover;
  }

  @media (min-width: 1281px) {
    width: 50vw;
    height: 70vh;
    background-size: cover;
  }

  @media (max-height: 500px) {
    height: 50vh;
    background-size: cover;
  }

  @media (min-height: 501px) and (max-height: 800px) {
    height: 65vh;
    background-size: cover;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    height: 70vh;
    background-size: cover;
  }

  @media (min-height: 1281px) {
    height: 85vh;
    background-size: cover;
  }
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

  // width @mediaquery
  @media (max-width: 500px) {
    width: 95%;
    height: 92%;
  }

  @media (min-width: 501px) and (max-width: 800px) {
    width: 97%;
    height: 92%;
  }

  @media (min-width: 801px) and (max-width: 1280px) {
    width: 96%;
    height: 92%;
  }

  @media (min-width: 1281px) {
    width: 95%;
    height: 92%;
  }

  // height @mediaquery
  /* @media (max-height: 500px) {
    height: 80%;
  }

  @media (min-height: 501px) and (max-height: 800px) {
    height: 85%;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    height: 92%;
  }

  @media (min-height: 1281px) {
    height: 90%;
  } */
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

  // width @mediaquery
  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 2.31em;
  }

  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 15px;
    line-height: 2.16em;
  }

  @media (min-width: 801px) and (max-width: 1280px) {
    font-size: 16px;
    line-height: 2.03em;
  }

  @media (min-width: 1281px) {
    font-size: 16px;
    line-height: 2.03em;
  }

  // height @mediaquery
  /* @media (max-height: 500px) {
    font-size: 12px;
    line-height: 2em;
  }

  @media (min-height: 501px) and (max-height: 800px) {
    font-size: 14px;
    line-height: 2.2em;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 16px;
    line-height: 2.03em;
  }

  @media (min-height: 1281px) {
    font-size: 18px;
    line-height: 2.6em;
  } */
`;

const ToInput = styled.div`
  font-family: "Handwriting", sans-serif;
  font-size: 16px;
  padding-top: 24px;

  // width @mediaquery
  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 2.1em;
  }

  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 16px;
    line-height: 1.83em;
  }

  @media (min-width: 801px) and (max-width: 1280px) {
    padding-top: 32px;
    font-size: 16px;
  }

  @media (min-width: 1281px) {
    font-size: 18px;
    line-height: 1.65em;
  }

  // height @mediaquery
  /* @media (max-height: 500px) {
    font-size: 12px;
    padding-top: 16px;
  }

  @media (min-height: 501px) and (max-height: 800px) {
    font-size: 14px;
    padding-top: 20px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 18px;
    padding-top: 24px;
  }

  @media (min-height: 1281px) {
    font-size: 18px;
    padding-top: 28px;
  } */
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
