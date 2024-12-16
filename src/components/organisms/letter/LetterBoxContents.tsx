import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { IoIosMail } from "react-icons/io"; // 메일 버튼
import useDebounce from "@/hooks/useDebounce";
import {
  getReceiveLetter,
  getSendLetter,
  getLetterReading,
} from "@/lib/api/controller/letter";
import { individualLetterState, tabState } from "@/store/recoil/letterAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import useThrottle from "@/hooks/useThrottle";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/router";

interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
  viewCheck: boolean;
}
const Mailbox: React.FC = () => {
  const router = useRouter();
  /** 모달 외부 클릭 감지를 위한 Ref **/
  const modalRef = useRef<HTMLDivElement>(null);
  /** 메일 리스트내에 스크롤을 위한 Ref **/
  const listRef = useRef<HTMLDivElement>(null);
  /** 메일 리스트 관리 state **/
  const [mails, setMails] = useState<Mail[]>([]);
  /** 받은 편지 리스트 관리 state **/
  const [receiveMails, setReceiveMails] = useState<Mail[]>([]);
  /** 보낸 편지 리스트 관리 state **/
  const [sendMails, setSendMails] = useState<Mail[]>([]);
  /** 무한스크롤을 위한 받은 편지 페이지 관리 state **/
  const [, setReceivePage] = useState(0);
  /** 무한스크롤을 위한 보낸 편지 페이지 관리 state **/
  const [, setSendPage] = useState(0);
  /** 무한스크롤을 위한 받은 편지 페이지 마지막 여부 관리 state **/
  const [receiveHasMore, setReceiveHasMore] = useState(true);
  /** 무한스크롤을 위한 보낸 편지 페이지 마지막 여부 관리 state **/
  const [sendHasMore, setSendHasMore] = useState(true);
  /** 검색어 관리 state **/
  const [searchTerm, setSearchTerm] = useState("");
  /** 검색어 디바운스 훅 **/
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  /** 개별 편지 정보 관리 state **/
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);
  /* 탭 관리 state */
  const [tab, setTab] = useRecoilState(tabState);

  /** 시간 format 함수 **/
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
  };

  /** 받은 편지함 데이터 조회 함수 **/
  const getAllReceiveLetter = async (pageNumber = 0) => {
    try {
      const res = await getReceiveLetter({
        page: pageNumber,
        size: 10,
        sort: "desc",
      });
      console.log("res: " + JSON.stringify(res, null, 2));
      const listLetter = res.data.responseData.letterDTO;
      const pageable = res.data.responseData.pageable;
      const formattedMails = listLetter.map((letter: any) => ({
        id: letter.id,
        sender: letter.fromUserNickname,
        subject: letter.contents,
        timeReceived: formatDate(letter.arrivedAt),
        viewCheck: letter.viewCheck,
      }));
      setReceiveMails((prevMails) => [...prevMails, ...formattedMails]); // pageable 데이터만으로 마지막 페이지 여부 확인
      if (listLetter.length < pageable.pageSize) {
        // 현재 페이지의 데이터가 pageSize보다 적으면 마지막 페이지로 간주
        setReceiveHasMore(false);
      } else {
        setReceiveHasMore(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /** 보낸 편지함 데이터 조회 함수 **/
  const getAllSendLetter = async (pageNumber = 0) => {
    try {
      const res = await getSendLetter({
        page: pageNumber,
        size: 10,
        sort: "desc",
      });
      const listLetter = res.data.responseData.listLetter;
      const pageable = res.data.responseData.pageable;
      const formattedMails = listLetter.map((letter: any) => ({
        id: letter.id,
        sender: letter.fromUserNickname,
        subject: letter.contents,
        timeReceived: formatDate(letter.createdAt),
      }));
      console.log("formattedMails : ", formattedMails);
      setSendMails((prevMails) => [...prevMails, ...formattedMails]); // pageable 데이터만으로 마지막 페이지 여부 확인
      if (listLetter.length < pageable.pageSize) {
        // 현재 페이지의 데이터가 pageSize보다 적으면 마지막 페이지로 간주
        setSendHasMore(false);
      } else {
        setSendHasMore(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /** tab상태에 따른 필터링 함수 **/
  const searchFilter = (type: string) => {
    if (type === "received") {
      const filteredMails = receiveMails.filter(
        (mail) =>
          mail.subject.includes(debouncedSearchTerm) ||
          mail.sender.includes(debouncedSearchTerm)
      );
      setMails(filteredMails);
    } else if (type === "send") {
      const filteredMails = sendMails.filter(
        (mail) =>
          mail.subject.includes(debouncedSearchTerm) ||
          mail.sender.includes(debouncedSearchTerm)
      );
      setMails(filteredMails);
    }
  };

  /** 검색어 변경 업데이트 이벤트 핸들러 함수 **/
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /** 탭 변경 이벤트 핸들러 함수 **/
  const handleTabChange = (newTab: "received" | "send") => {
    setTab(newTab);
  };

  /** 편지 쓰기 모달창 이동 함수 **/
  const toUserNicknameModalClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    // 이벤트 전파 방지
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/userconfirm");
    }
  };

  /** 개별 메일 아이템 클릭 이벤트(개별 편지 팝업창) **/
  const handleMailItemClick = async (mail: Mail) => {
    setIndividualLetterInfo((prev) => ({
      ...prev,
      isOpen: true,
      id: mail.id,
      toUserNickname: mail.sender,
      letterContent: mail.subject,
      fromUserNickname: mail.sender,
      onDelete: false,
      tab: tab as "received" | "send",
    }));
    await getLetterReading(mail.id);
  };

  /** 무한 스크롤 이벤트 핸들러 함수 **/
  const handleScroll = useCallback(
    useThrottle(() => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          if (tab === "received" && receiveHasMore) {
            setReceivePage((prevPage) => {
              const nextPage = prevPage + 1;
              getAllReceiveLetter(nextPage);
              return nextPage;
            });
          } else if (tab === "send" && sendHasMore) {
            setSendPage((prevPage) => {
              const nextPage = prevPage + 1;
              getAllSendLetter(nextPage);
              return nextPage;
            });
          }
        }
      }
    }, 100),
    [receiveHasMore, sendHasMore, tab]
  );

  /** 초기 메일 리스트 조회 **/
  useEffect(() => {
    getAllReceiveLetter();
    getAllSendLetter();
  }, []);
  /** tab상태에 따른 필터링 이벤트 감지 **/
  useEffect(() => {
    searchFilter(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, debouncedSearchTerm, receiveMails, sendMails]);
  /** 모달 외부 클릭 시닫기 **/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        router.push("/");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [router]);

  /** 무한 스크롤 이벤트 감지 **/
  useEffect(() => {
    const currentRef = listRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  /** 탭 변경 시 스크롤 위치 초기화 **/
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [tab]);

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <MailboxWrap>
          <Header>
            <Tab
              $active={tab === "received"}
              onClick={() => handleTabChange("received")}
            >
              받은 편지함
            </Tab>
            <Tab
              $active={tab === "send"}
              onClick={() => handleTabChange("send")}
            >
              보낸 편지함
            </Tab>
            <Exit onClick={() => router.push("/")}>X</Exit>
          </Header>
          <SearchBar
            placeholder="메일 검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MailList ref={listRef}>
            {mails.map((mail) => (
              <MailItem key={mail.id} onClick={() => handleMailItemClick(mail)}>
                <MailItemColumnWrap>
                  <MailItemRowWrap>
                    <Sender>
                      {tab === "received" && !mail.viewCheck && (
                        <UnreadIcon
                          src="images/letter_reading_icon.jpg"
                          alt="Unread"
                        />
                      )}
                      {mail.sender}
                    </Sender>
                    <TimeReceived>{mail.timeReceived}</TimeReceived>
                  </MailItemRowWrap>
                  <Subject>{mail.subject}</Subject>
                </MailItemColumnWrap>
              </MailItem>
            ))}
          </MailList>
          <LetterWriteButton onClick={toUserNicknameModalClick}>
            <IoIosMail />
          </LetterWriteButton>
        </MailboxWrap>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ModalContent = styled.div`
  background: #000000a6;
  border-radius: 2px;
  width: 430px;
  height: 600px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #0000005c;
  position: relative;
  padding: 20px;
`;

const MailboxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

const Tab = styled.button<{ $active: boolean }>`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 10px 20px;
  background-color: ${({ $active }) =>
    $active ? "rgba(75, 75, 75, 0.1);" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#ccc")};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(75, 75, 75, 0.1);
    color: #fff;
  }
`;

const Exit = styled.div`
  position: absolute;
  right: -14px;
  top: -14px;
  padding: 4px 12px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

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

const LetterWriteButton = styled.button`
  position: absolute;
  bottom: -6px;
  left: 386px;
  width: 50px;
  height: 50px;
  background-color: #595858;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #505050;
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

const MailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const MailItemColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MailItemRowWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 5px;
`;

const Sender = styled.div`
  font-weight: bold;
`;
const UnreadIcon = styled.img`
  margin-right: 8px;
  width: 18px;
  height: 12px;
`;

const Subject = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* 추가 */
  display: block; /* 추가 */
`;

const TimeReceived = styled.div`
  color: #888;
`;

export default Mailbox;
