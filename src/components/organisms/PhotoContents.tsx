"use client";

import { useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * 사진 모달 컴포넌트
 *  */
const PhotoContents = () => {
  const router = useRouter();
  /** 사진 모달 텍스트 query */
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  /** 사진 모달 참조 */
  const popupRef = useRef<HTMLDivElement>(null);

  /** 사진 모달 닫기 함수 */
  const handleClose = () => {
    router.back();
  };

  /** 사진 모달 외부 클릭 감지 이벤트 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        router.back();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [router]);

  return (
    <Html center>
      <PopupContainer ref={popupRef}>
        <PopupHeader>
          <CloseButton onClick={handleClose}>X</CloseButton>
        </PopupHeader>
        <PopupContent>
          <p>{text}</p>
        </PopupContent>
      </PopupContainer>
    </Html>
  );
};

export default PhotoContents;

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
