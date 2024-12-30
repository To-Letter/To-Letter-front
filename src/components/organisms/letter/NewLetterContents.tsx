import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { individualLetterState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";
import { MainBox } from "@/components/atoms/Box";
import { LetterList } from "./LetterList";
import { Mail } from "@/types/letterType";

export default function NewLettersubject() {
  const router = useRouter();
  /** 받은 메일 리스트 관리 state **/
  /* const [letters, setLetters] = useState<Mail[]>([]); */
  /** 무한스크롤을 위한 받은 편지 페이지 관리 state **/
  const [, setPage] = useState(0);
  /** 무한스크롤을 위한 받은 편지 페이지 마지막 여부 관리 state **/
  const [hasMore, setHasMore] = useState(true);
  /** 개별 편지 정보 관리 state **/
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

  /**
   * [삭제 필요]받은 편지 데이터 예시
   */
  const listLetter = [
    {
      id: 1,
      sender: "윤미1",
      subject: "1번 편지입니다.",
      timeReceived: new Date().toISOString(),
      viewCheck: false,
    },
    {
      id: 2,
      sender: "윤미2",
      subject:
        "test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2",
      timeReceived: new Date().toISOString(),
      viewCheck: false,
    },
    {
      id: 3,
      sender: "투레터",
      subject:
        "test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3",
      timeReceived: new Date().toISOString(),
      viewCheck: false,
    },
    {
      id: 4,
      sender: "메리크리스마스",
      subject: "수요일 빨간 날 최고",
      timeReceived: new Date().toISOString(),
      viewCheck: false,
    },
  ];

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

  return (
    <MainBox $width="100%" $height="100%">
      <LetterList
        letters={listLetter}
        onLetterClick={handleMailItemClick}
        fetchMore={fetchMore}
        hasMore={hasMore}
        isSearchAble={false}
        type="receive"
      />
    </MainBox>
  );
}
