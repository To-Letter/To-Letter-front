// components/organisms/letter/SendLetters.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { individualLetterState } from "@/store/recoil/letterAtom";
// import { getSendLetter } from "@/lib/api/controller/letter";
// import useDebounce from "@/hooks/useDebounce"; //[주석 해제 필요] build error fix
import { LetterList } from "./LetterList";
import { Mail } from "@/types/letterType";
import { useRouter } from "next/navigation";

export function SendLetters() {
  const router = useRouter();
  /** 보낸 메일 리스트 관리 state **/
  const [letters, setLetters] = useState<Mail[]>([]);
  /** 무한스크롤을 위한 보낸 편지 페이지 관리 state **/
  const [, setPage] = useState(0);
  /** 무한스크롤을 위한 보낸 편지 페이지 마지막 여부 관리 state **/
  const [hasMore, setHasMore] = useState(true);
  /** 검색어 관리 state **/
  const [searchTerm, setSearchTerm] = useState("");
  /** 검색어 디바운스 훅 **/
  // const debouncedSearchTerm = useDebounce(searchTerm, 300); // [주석 해제 필요] build error fix
  /** 개별 편지 정보 관리 state **/
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

  /**
   * [삭제 필요]받은 편지 데이터 예시
   */
  const listLetter = useMemo(() => {
    return [
      {
        id: 1,
        fromUserNickname: "윤미1",
        contents: "1번 편지입니다.",
        arrivedAt: new Date().toISOString(),
        viewCheck: false,
      },
      {
        id: 2,
        fromUserNickname: "윤미2",
        contents:
          "test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2",
        arrivedAt: new Date().toISOString(),
        viewCheck: true,
      },
      {
        id: 3,
        fromUserNickname: "투레터",
        contents:
          "test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3test3",
        arrivedAt: new Date().toISOString(),
        viewCheck: true,
      },
      {
        id: 4,
        fromUserNickname: "메리크리스마스",
        contents: "수요일 빨간 날 최고",
        arrivedAt: new Date().toISOString(),
        viewCheck: true,
      },
    ];
  }, []);

  /** [삭제 필요]페이지 데이터 예시 **/
  const pageable = useMemo(() => {
    return {
      pageNumber: 1,
      pageSize: 10,
      totalElements: 4,
      totalPages: 1,
    };
  }, []);

  /** 보낸 편지함 데이터 조회 함수 */
  const getAllSendLetters = useCallback(
    async (pageNumber = 0) => {
      try {
        /* const res = await getSendLetter({
        page: pageNumber,
        size: 10,
        sort: "desc",
      });
      const listLetter = res.data.responseData.listLetter;
      const pageable = res.data.responseData.pageable; */
        console.log(pageNumber); // [삭제 필요] build error fix
        const formattedMails = listLetter.map((letter: any) => ({
          id: letter.id,
          sender: letter.fromUserNickname,
          subject: letter.contents,
          timeReceived: letter.createdAt,
        }));

        setLetters((prevMails) => [...prevMails, ...formattedMails]);

        if (listLetter.length < pageable.pageSize) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [listLetter, pageable.pageSize]
  );

  /** 개별 편지 클릭 핸들러 */
  const handleLetterClick = async (mail: Mail) => {
    setIndividualLetterInfo({
      id: mail.id,
      toUserNickname: mail.sender,
      letterContent: mail.subject,
      fromUserNickname: mail.sender,
      onDelete: false,
      tab: "send", // 보낸 편지함으로 설정
    });
    router.push("/letter/individualletter");
  };

  // 무한 스크롤용 fetchMore 함수
  const fetchMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      getAllSendLetters(nextPage);
      return nextPage;
    });
  };

  // 초기 데이터 로드
  useEffect(() => {
    getAllSendLetters(0);
  }, [getAllSendLetters]);

  // 검색어 필터링
  const filteredLetters = useMemo(
    () =>
      /* letters.filter(
        (mail) =>
          mail.subject.includes(debouncedSearchTerm) ||
          mail.sender.includes(debouncedSearchTerm)
      ) */ letters,
    [letters]
  );

  return (
    <LetterList
      letters={filteredLetters}
      onLetterClick={handleLetterClick}
      fetchMore={fetchMore}
      hasMore={hasMore}
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      type="send" // 보낸 편지함 타입으로 설정
    />
  );
}
