"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { individualLetterState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";
import { MainBox } from "@/components/atoms/Box";
import { LetterList } from "./LetterList";
import { Mail } from "@/types/letterType";
import { getUnReadLetter } from "@/lib/api/controller/letter";

export default function NewLettersubject() {
  const router = useRouter();
  /** 받은 메일 리스트 관리 state **/
  const [letters, setLetters] = useState<Mail[]>([]);
  /** 무한스크롤을 위한 받은 편지 페이지 관리 state **/
  const [, setPage] = useState(0);
  /** 무한스크롤을 위한 받은 편지 페이지 마지막 여부 관리 state **/
  const [hasMore, setHasMore] = useState(true);
  /** 개별 편지 정보 관리 state **/
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

  /** 안 읽은 편지함 데이터 조회 함수 */
  const getUnReadLetters = useCallback(async (pageNumber = 0) => {
    try {
      const res = await getUnReadLetter({
        page: pageNumber,
        size: 10,
        sort: "desc",
      });
      const listLetter = res.data.responseData.letterDTO;
      const pageable = res.data.responseData.pageable;
      const formattedMails = listLetter.map((letter: any) => ({
        id: letter.id,
        sender: letter.fromUserNickname,
        subject: letter.contents,
        timeReceived: letter.arrivedAt,
        viewCheck: letter.viewCheck,
      }));

      setLetters((prevMails) => [...prevMails, ...formattedMails]);

      // 마지막 페이지 체크
      if (listLetter.length < pageable.pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  /** 메일 아이템 클릭 이벤트(개별 편지 팝업창) */
  const handleMailItemClick = (mail: Mail) => {
    setIndividualLetterInfo({
      id: mail.id,
      toUserNickname: mail.sender,
      letterContent: mail.subject,
      fromUserNickname: mail.sender,
      onDelete: true,
      tab: "received",
    });
    // 개별 편지 팝업창 이동
    router.push("/letter/individualletter");
  };

  /** 무한 스크롤 page 관리 함수 */
  const fetchMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      /* getAllReceiveLetters(nextPage); */
      setHasMore(true); // [삭제 필요] build error 임시 처리
      return nextPage;
    });
  };

  /** 초기 안 읽은 편지 데이터 로드 */
  useEffect(() => {
    getUnReadLetters(0);
  }, [getUnReadLetters]);

  return (
    <MainBox $width="100%" $height="100%">
      <LetterList
        letters={letters}
        onLetterClick={handleMailItemClick}
        fetchMore={fetchMore}
        hasMore={hasMore}
        isSearchAble={false}
        type="receive"
      />
    </MainBox>
  );
}
