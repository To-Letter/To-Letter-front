import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosMail } from "react-icons/io"; // 메일 버튼
import { IoMdClose } from "react-icons/io";
import ToastMessage from "@/components/atoms/ToastMessage";
import { useUser } from "@/hooks/useUser";
import { useRecoilState } from "recoil";
import { nicknameAndContentsState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/router";

const LetterWriteContents: React.FC = () => {
  const router = useRouter();
  /** 이벤트 관리를 위한 Ref */
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaCurrent = textareaRef.current;
  /** 유저 정보 관리 */
  const { myInfo } = useUser();
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /* 받는 사람 닉네임과 편지내용을 관리하는 reocil */
  const [nicknameAndContents, setNicknameAndContents] = useRecoilState(
    nicknameAndContentsState
  );

  /** 모달 외부 클릭시 모달 닫히게 하는 함수 */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      router.push("/");
    }
  };

  /** 편지 내용 변경시 편지내용 recoil에 업데이트 하는 함수 */
  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    setNicknameAndContents({ nickname: "", contents: contents });
  };

  /** 편지 내용이 있는 경우 편지 보내기 모달로 이동하는 함수 */
  const moveSendLetterModal = () => {
    if (nicknameAndContents.contents !== "") {
      router.push("/letter/lettersend");
    } else {
      setToast({ message: "편지에 내용을 써주세요.", visible: true });
    }
  };

  /** 편지 내용 스크롤 이벤트 관리 */
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (textareaCurrent) {
        event.preventDefault();
        const lineHeight = parseFloat(
          window.getComputedStyle(textareaCurrent).lineHeight
        );
        textareaCurrent.scrollTop +=
          event.deltaY > 0 ? lineHeight : -lineHeight;
      }
    };

    if (textareaCurrent) {
      textareaCurrent.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (textareaCurrent) {
        textareaCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, [textareaCurrent]);

  /** 모달 외부 클릭 감지 함수 */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Popup ref={modalRef}>
      <CloseButton onClick={() => router.push("/")}>
        <IoMdClose />
      </CloseButton>
      <PopupInner>
        <ToInputWrapper>
          <ToInput>{`To. ${nicknameAndContents.nickname}`}</ToInput>
        </ToInputWrapper>
        <StyledTextarea
          value={nicknameAndContents.contents}
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

export default LetterWriteContents;
