import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosMail } from "react-icons/io"; // 메일 버튼
import { IoMdClose } from "react-icons/io";
import ToastMessage from "../ToastMessage";
import { useUser } from "../../hook/useUser";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  letterContentState,
  letterPopupState,
  sendLetterModalState,
} from "../../recoil/letterPopupAtom";
import { toUserNicknameState } from "../../recoil/toUserNicknameAtom";

const LetterPopup: React.FC = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { myInfo } = useUser();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const setLetterPopupModal = useSetRecoilState(letterPopupState);
  const setSendLetterModal = useSetRecoilState(sendLetterModalState);

  const toUserNickname = useRecoilValue(toUserNicknameState);
  const [letterContent, setLetterContent] = useRecoilState(letterContentState);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setLetterPopupModal(false);
    }
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    setLetterContent(contents);
  };

  const moveSendLetterModal = () => {
    if (letterContent !== "") {
      setLetterPopupModal(false); // 편지 다 쓰면 편지지는 false
      setSendLetterModal(true); // 마지막 확인 모달창은 true
    } else {
      setToast({ message: "편지에 내용을 써주세요.", visible: true });
    }
  };

  useEffect(() => {
    console.log("my info : ", myInfo);
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
      <CloseButton onClick={() => setLetterPopupModal(false)}>
        <IoMdClose />
      </CloseButton>
      <PopupInner ref={innerRef}>
        <ToInputWrapper>
          <ToInput>{`To. ${toUserNickname}`}</ToInput>
        </ToInputWrapper>
        <StyledTextarea
          value={letterContent}
          ref={textareaRef}
          onChange={onChangeContents}
          placeholder="Write your letter here..."
          spellCheck={false}
        />
      </PopupInner>
      <FromText>From. {myInfo.nickname}</FromText>
      <SendButton onClick={moveSendLetterModal}>
        <IoIosMail />
      </SendButton>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
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
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #9f9696;
    border-radius: 6px;
  }
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

const ToInputWrapper = styled.div`
  display: flex;
  align-items: center;
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
