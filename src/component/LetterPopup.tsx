import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface LetterPopupProps {
  onClose: () => void;
}

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopupInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PopupTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PopupButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #0056b3;
  }
`;

const LetterPopup: React.FC<LetterPopupProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    // 서버에 편지 제목과 내용을 전송하는 로직을 구현합니다.
    console.log("Title:", title);
    console.log("Contents:", contents);
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Popup ref={popupRef}>
      <PopupInner>
        <h2>편지 쓰기</h2>
        <PopupInput
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PopupTextarea
          placeholder="내용"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <PopupButton onClick={handleSubmit}>전송</PopupButton>
        <PopupButton onClick={onClose}>닫기</PopupButton>
      </PopupInner>
    </Popup>
  );
};

export default LetterPopup;
