import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";
import { individualLetterState } from "../../recoil/letterPopupAtom";
import { FaTrash } from "react-icons/fa";
import { loadingState } from "../../recoil/loadingAtom";
import { deleteLetter } from "../../apis/controller/letter";
import ConfirmDelete from "./ConfirmDelete";

const IndividualLetterPopup = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [individualLetterInfo, setIndividualLetterInfo] = useRecoilState(
    individualLetterState
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isConfirmPopup, setIsConfirmPopup] = useState<boolean>(false)
  const setLoadingState = useSetRecoilState(loadingState);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIndividualLetterInfo({
        isOpen: false,
        id: -9999,
        toUserNickname: "",
        letterContent: "",
        fromUserNickname: "",
        onDelete: false,
        tab: "received"
      });
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

  useEffect(() => {
    setLoadingState(true);
    const img = new Image();
    img.src = "/images/letter_background.jpg";
    img.onload = () => {
      setIsImageLoaded(true)
      setLoadingState(false);
    };
  }, []);

  return (
    isImageLoaded ? (
    <Popup ref={popupRef}>
      <CloseButton
        onClick={() =>
          setIndividualLetterInfo({
            isOpen: false,
            id: -9999,
            toUserNickname: "",
            letterContent: "",
            fromUserNickname: "",
            onDelete: false,
            tab: "received"
          })
        }
      >
        <IoMdClose />
      </CloseButton>
      <PopupInner ref={innerRef}>
        <ToInputWrapper>
          <ToInput>{`To. ${individualLetterInfo.toUserNickname}`}</ToInput>
        </ToInputWrapper>
        <StyledTextarea
          value={individualLetterInfo.letterContent}
          ref={textareaRef}
          placeholder="Write your letter here..."
          spellCheck={false}
          readOnly
          onFocus={(e) => e.target.blur()} // 클릭해도 커서 깜빡거리지 않도록
          style={{ cursor: "default" }} // 마우스 커서를 기본 모양으로
        />
      </PopupInner>
      <FromText>From. {individualLetterInfo.fromUserNickname}</FromText>
      {
        individualLetterInfo.onDelete &&
        <DeleteButton onClick={()=>setIsConfirmPopup(true)}>
          <FaTrash />
        </DeleteButton>
      }
      {isConfirmPopup && <ConfirmDelete mailIds={[individualLetterInfo.id]} setIsConfirmPopup={setIsConfirmPopup} type={individualLetterInfo.tab}/>}
    </Popup>
    ): null
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

const DeleteButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  padding: 0;

  &:hover {
    color: #5f0202;
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

export default IndividualLetterPopup;
