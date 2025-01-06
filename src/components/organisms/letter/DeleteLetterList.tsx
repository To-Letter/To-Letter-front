"use client";

import useThrottle from "@/hooks/useThrottle";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import LetterItem from "../../molecules/LetterItem";
import { Mail } from "@/types/letterType";
import { MainBox } from "@/components/atoms/Box";

/**
 * @returns 편지 아이템 컴포넌트 UI
 * @param letters 편지 리스트 데이터
 * @param onLetterClick 편지 클릭 이벤트 핸들러
 * @param fetchMore 무한 스크롤 페이지 관리 함수
 * @param hasMore 무한 스크롤 페이지 마지막 여부 관리 state
 * @param handleCheckboxChange 체크박스 상태 변경 시 id값 업데이트 함수
 * @param checkedState 체크박스 상태 관리 state
 * @param isSearchAble? 서치 기능 포함 여부 관리 state(기본 false)
 * @param searchTerm? 검색어 관리 state
 * @param onSearchChange? 검색어 변경 이벤트 핸들러
 * @param type 편지 리스트 타입(받은 편지, 보낸 편지)
 */
interface LetterListProps {
  letters: Mail[];
  onLetterClick: (mail: Mail) => void;
  fetchMore: () => void;
  handleCheckboxChange: (index: number) => void;
  checkedState: boolean[];
  hasMore: boolean;
  isSearchAble?: boolean;
  searchTerm?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "receive" | "send";
}

export function DeleteLetterList({
  letters,
  onLetterClick,
  fetchMore,
  handleCheckboxChange,
  checkedState,
  hasMore,
  isSearchAble = true,
  searchTerm = "",
  onSearchChange = () => {},
  type,
}: LetterListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  /** 무한 스크롤 이벤트 핸들러 함수 **/
  const throttledScrollHandler = useThrottle(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
        fetchMore();
      }
    }
  }, 100);

  /** 무한 스크롤 이벤트 핸들러 함수 등록 **/
  useEffect(() => {
    const currentRef = listRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", throttledScrollHandler);
      return () =>
        currentRef.removeEventListener("scroll", throttledScrollHandler);
    }
  }, [throttledScrollHandler]);

  return (
    <MainBox $direction="column" $height="95%" $width="100%">
      {isSearchAble && (
        <SearchBar
          placeholder="메일 검색"
          value={searchTerm}
          onChange={onSearchChange}
        />
      )}
      <MailList ref={listRef}>
        {letters.map((mail, index) => (
          <LetterItem
            key={`LetterItem-${mail.id}`}
            letter={mail}
            onClick={() => onLetterClick(mail)}
            type={type}
          >
            <MailCheckBtn
              type="checkbox"
              checked={checkedState[index]}
              onChange={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleCheckboxChange(index);
              }}
            />
          </LetterItem>
        ))}
      </MailList>
    </MainBox>
  );
}

const SearchBar = styled.input`
  width: 100%;
  height: 10px;
  padding: 12px 0px;
  margin-top: 6px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 16px;
  color: #000000;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #848484;
  }
`;

const MailList = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #e9e4e4;
    border-radius: 6px;
  }
`;

const MailCheckBtn = styled.input.attrs({ type: "checkbox" })`
  /* 기본 체크박스 숨기기 */
  appearance: none;
  -webkit-appearance: none; // Safari 지원을 위해 추가
  -moz-appearance: none; // Firefox 지원을 위해 추가
  position: relative; // 위치 지정을 위해 추가
  display: inline-block; // 표시 방식 변경
  margin: 8px 12px 8px 0px;
  min-width: 20px;
  height: 20px;
  border: 2px solid #5a5a5a;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent; // 배경색 투명하게 설정

  /* 체크 시 스타일 */
  &:checked {
    background-color: #5a5a5a;
    border-color: #5a5a5a;
  }

  /* 체크 표시 추가 */
  &:checked::after {
    content: "✔";
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
`;
