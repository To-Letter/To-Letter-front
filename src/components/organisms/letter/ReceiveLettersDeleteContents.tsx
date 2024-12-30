import React, { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import useDebounce from "@/hooks/useDebounce"; //[주석 해제 필요] build error fix
import { useSetRecoilState } from "recoil";
import { individualLetterState } from "@/store/recoil/letterAtom";
import DeleteConfirmContents from "./DeleteConfirmContents";
import { MainBox } from "@/components/atoms/Box";
import { DeleteLetterList } from "./DeleteLetterList";
import DeleteLetterButton from "@/components/molecules/DeleteLetterButton";

interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
}

const ReceiveLettersDeleteContents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /** 받은 메일 리스트 관리 state **/
  const [letters, setLetters] = useState<Mail[]>([]);
  /* 편지 삭제 확인 모달의 유무 */
  const confirm = searchParams.get("confirm")?.toString();
  /** 무한스크롤을 위한 받은 편지 페이지 관리 state **/
  const [, setPage] = useState(0);
  /** 무한스크롤을 위한 받은 편지 페이지 마지막 여부 관리 state **/
  const [hasMore, setHasMore] = useState(true);
  /** 검색어 관리 state **/
  const [searchTerm, setSearchTerm] = useState("");
  /** 검색어 디바운스 훅 **/
  // const debouncedSearchTerm = useDebounce(searchTerm, 300); // [주석 해제 필요] build error fix
  /** 개별 편지 정보 관리 state **/
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);
  /* 개별 편지 체크박스 상태 관리 state */
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  /* 삭제할 편지 ID 관리 state */
  const [deleteLetterIds, setDeleteLetterIds] = useState<number[]>([]);

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

  /** 편지 삭제 버튼 클릭 시 실행 함수 */
  const handelDeleteConfirm = () => {
    if (deleteLetterIds.length === 0) {
      alert("삭제할 편지를 선택해주세요.");
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("confirm", "true");

    router.push(`${pathname}?${params.toString()}`);
  };

  /** 전체 선택 버튼 클릭 시 실행 함수 */
  const handleSelectAllClick = () => {
    const allChecked = checkedState.every(Boolean); // 모든 체크박스가 체크되어 있는지 확인
    const newCheckedState = new Array(letters.length).fill(!allChecked);
    setCheckedState(newCheckedState);

    if (!allChecked) {
      // 전체 체크하는 경우: 체크되지 않은 메일의 ID를 추가
      const uncheckedMailIds = letters
        .filter((_, index) => !checkedState[index]) // 체크되지 않은 메일만 필터링
        .map((mail) => mail.id);

      setDeleteLetterIds((prevIds) => [...prevIds, ...uncheckedMailIds]);
    } else {
      // 전체 해제하는 경우: 현재 체크된 모든 메일의 ID를 삭제
      const checkedMailIds = letters.map((mail) => mail.id);
      setDeleteLetterIds((prevIds) =>
        prevIds.filter((id) => !checkedMailIds.includes(id))
      );
    }
  };

  /** 체크박스 상태 변경 시 id값 업데이트 함수 */
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const selectedMailId = letters[index].id;
    if (updatedCheckedState[index]) {
      // 체크된 경우 메일 ID 추가
      setDeleteLetterIds((prevIds) => [...prevIds, selectedMailId]);
    } else {
      // 체크 해제된 경우 메일 ID 제거
      setDeleteLetterIds((prevIds) =>
        prevIds.filter((id) => id !== selectedMailId)
      );
    }
  };

  /** 받은 편지함 데이터 조회 함수 */
  const getAllReceiveLetters = useCallback(
    async (pageNumber = 0) => {
      try {
        /* const res = await getReceiveLetter({
        page: pageNumber,
        size: 10,
        sort: "desc",
      });
      const listLetter = res.data.responseData.letterDTO;
      const pageable = res.data.responseData.pageable; */
        console.log(pageNumber); // [삭제 필요] build error fix
        const formattedMails = listLetter.map((letter: any) => ({
          id: letter.id,
          sender: letter.fromUserNickname,
          subject: letter.contents,
          timeReceived: letter.arrivedAt,
          viewCheck: letter.viewCheck,
        }));

        setLetters((prevMails) => [...prevMails, ...formattedMails]);
        setCheckedState(new Array(formattedMails.length).fill(false));
        // 마지막 페이지 체크
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

  /** 개별 메일 아이템 클릭 이벤트(개별 편지 팝업창) */
  const handleLetterClick = async (mail: Mail) => {
    setIndividualLetterInfo({
      id: mail.id,
      toUserNickname: mail.sender,
      letterContent: mail.subject,
      fromUserNickname: mail.sender,
      onDelete: true,
      tab: "received",
    });
    // await getLetterReading(mail.id);
    router.push("/letter/individualletter");
  };

  /** 무한 스크롤 page 관리 함수 */
  const fetchMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      getAllReceiveLetters(nextPage);
      return nextPage;
    });
  };

  /** 초기 받은 편지 데이터 로드 */
  useEffect(() => {
    getAllReceiveLetters(0);
  }, [getAllReceiveLetters]);

  /** 검색어 필터링 */
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
    <MainBox
      $width="430px"
      $height="570px"
      $direction="column"
      $alignItems="center"
    >
      <DeleteLetterList
        letters={filteredLetters}
        onLetterClick={handleLetterClick}
        fetchMore={fetchMore}
        hasMore={hasMore}
        handleCheckboxChange={handleCheckboxChange}
        checkedState={checkedState}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        type="receive"
      />
      <DeleteLetterButton
        handleSelectAllClick={handleSelectAllClick}
        handelDeleteConfirm={handelDeleteConfirm}
      />

      {confirm === "true" && (
        <DeleteConfirmContents
          mailIds={deleteLetterIds}
          onClose={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("confirm");
            router.push(
              `${pathname}${params.toString() ? `?${params.toString()}` : ""}`
            );
          }}
          setSearchTerm={setSearchTerm}
          type="received"
        />
      )}
    </MainBox>
  );
};

export default ReceiveLettersDeleteContents;