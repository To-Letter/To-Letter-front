import useThrottle from "@/hooks/useThrottle";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import LetterItem from "./LetterItem";
import { Mail } from "@/types/letterType";

/**
 * @returns 편지 아이템 컴포넌트 UI
 * @param letters 편지 리스트 데이터
 * @param onLetterClick 편지 클릭 이벤트 핸들러
 * @param fetchMore 무한 스크롤 페이지 관리 함수
 * @param hasMore 무한 스크롤 페이지 마지막 여부 관리 state
 * @param searchTerm 검색어 관리 state
 * @param onSearchChange 검색어 변경 이벤트 핸들러
 * @param type 편지 리스트 타입(받은 편지, 보낸 편지)
 */
interface LetterListProps {
  letters: Mail[];
  onLetterClick: (mail: Mail) => void;
  fetchMore: () => void;
  hasMore: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "receive" | "send";
}

export function LetterList({
  letters,
  onLetterClick,
  fetchMore,
  hasMore,
  searchTerm,
  onSearchChange,
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
    <>
      <SearchBar
        placeholder="메일 검색"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <MailList ref={listRef}>
        {letters.map((mail) => (
          <LetterItem
            key={mail.id}
            letter={mail}
            onClick={() => onLetterClick(mail)}
            type={type}
          />
        ))}
      </MailList>
    </>
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
