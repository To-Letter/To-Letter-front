import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoTrashBinSharp  } from "react-icons/io5";
import useDebounce from "../../hook/useDebounce";
import { getReceiveLetter, getSendLetter } from "../../apis/controller/letter";
import {individualLetterState} from "../../recoil/letterPopupAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deleteLetterPopupState } from "../../recoil/deleteLetterPopupAtom";
import ConfirmDelete from "./ConfirmDelete";
import { CgPlayListCheck } from "react-icons/cg";

interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
}


const DeleteLetterModal: React.FC = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [receiveMails, setReceiveMails] = useState<Mail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState<"received"|"send">("received"); // "received" or "send"
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay
  const [sendMails, setSendMails] = useState<Mail[]>([]);
  const setDeleteLetterPopup = useSetRecoilState(deleteLetterPopupState)
  const [isConfirmPopup, setIsConfirmPopup] = useState<boolean>(false)
  const [deleteLetterIds, setDeleteLetterIds] = useState<number[]>([])
  const [individualLetterInfo, setIndividualLetterInfo] = useRecoilState(
    individualLetterState
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllReceiveLetter();
    getAllSendLetter();
  }, [isConfirmPopup, individualLetterInfo.id]);

  useEffect(() => {
    searchFilter(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, debouncedSearchTerm, receiveMails, sendMails]);


  // 받은 편지함
  const getAllReceiveLetter = async () => {
    try {
      const res = await getReceiveLetter();
      const listLetter = res.data.responseData.listLetter;
      const formattedMails = listLetter.map((letter: any) => ({
        id: letter.id,
        sender: letter.fromUserNickname,
        subject: letter.contents,
        timeReceived: letter.arrivedAt,
      }));
      setReceiveMails(formattedMails);
      setCheckedState(new Array(formattedMails.length).fill(false));
    } catch (err) {
      console.log(err);
    }
  };

  // 보낸 편지함
  const getAllSendLetter = async () => {
    try {
      const res = await getSendLetter();
      const listLetter = res.data.responseData.listLetter;
      const formattedMails = listLetter.map((letter: any) => ({
        id: letter.id,
        sender: letter.fromUserNickname,
        subject: letter.contents,
        timeReceived: letter.arrivedAt,
      }));
      setSendMails(formattedMails);
      setCheckedState(new Array(formattedMails.length).fill(false));
    } catch (err) {
      console.log(err);
    }
  };

  // 검색어 필터링
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (newTab: "received"|"send") => {
    setTab(newTab);
  };


  // 메일 아이템 클릭 이벤트(개별 편지 팝업창)
  const handleMailItemClick = (mail: Mail) => {
    console.log("개별 메일 확인: ", mail);
    setIndividualLetterInfo({
      isOpen: true,
      id: mail.id,
      toUserNickname: mail.sender,
      letterContent: mail.subject,
      fromUserNickname: mail.sender,
      onDelete: true,
      tab: tab
    });
  };

  // 전체 선택 버튼 클릭 시 실행
  const handleSelectAllClick = () => {
    const allChecked = checkedState.every(Boolean); // 모든 체크박스가 체크되어 있는지 확인
    const newCheckedState = new Array(mails.length).fill(!allChecked);
    setCheckedState(newCheckedState);

    if (!allChecked) {
      // 전체 체크하는 경우: 체크되지 않은 메일의 ID를 추가
      const uncheckedMailIds = mails
        .filter((_, index) => !checkedState[index]) // 체크되지 않은 메일만 필터링
        .map((mail) => mail.id);

      setDeleteLetterIds((prevIds) => [...prevIds, ...uncheckedMailIds]);
    } else {
      // 전체 해제하는 경우: 현재 체크된 모든 메일의 ID를 삭제
      const checkedMailIds = mails.map((mail) => mail.id);
      setDeleteLetterIds((prevIds) =>
        prevIds.filter((id) => !checkedMailIds.includes(id))
      );
    }
  };

    // 체크박스 상태 변경 시 id값 업데이트 로직 추가
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const selectedMailId = mails[index].id;
    if (updatedCheckedState[index]) {
      // 체크된 경우 메일 ID 추가
      setDeleteLetterIds((prevIds) => [...prevIds, selectedMailId]);
    } else {
      // 체크 해제된 경우 메일 ID 제거
      setDeleteLetterIds((prevIds) => prevIds.filter((id) => id !== selectedMailId));
    }
  };


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
            <Exit onClick={() => setDeleteLetterPopup(false)}>X</Exit>
          </Header>
          <SearchBar
            placeholder="메일 검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MailList>
            {mails.map((mail, index) => (
              <MailItem key={mail.id}>
                <MailCheckBtn 
                  key={mail.id}
                  type="checkbox"
                  checked={checkedState[index]} // 개별 체크박스 상태
                  onChange={() => handleCheckboxChange(index)} // 클릭 이벤트
                />
                <MailItemColumnWrap  onClick={() => handleMailItemClick(mail)}>
                  <MailItemRowWrap>
                    <Sender>{mail.sender}</Sender>
                    <TimeReceived>
                      {mail.timeReceived.split('T')[0]}
                    </TimeReceived>
                  </MailItemRowWrap>
                  <Subject>{mail.subject}</Subject>
                </MailItemColumnWrap>
              </MailItem>
            ))}
          </MailList>
          <LetterAllCheck onClick={handleSelectAllClick}>
            <CgPlayListCheck />
          </LetterAllCheck>
          <LetterWriteButton onClick={()=> setIsConfirmPopup(prev => !prev)}>
            <IoTrashBinSharp />
          </LetterWriteButton>
        </MailboxWrap>
      </ModalContent>
      {isConfirmPopup && <ConfirmDelete mailIds={deleteLetterIds} setIsConfirmPopup={setIsConfirmPopup} type={tab} setSearchTerm={setSearchTerm}/>}
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

const LetterAllCheck = styled.button`
  position: absolute;
  bottom: 52px;
  left: 386px;
  width: 50px;
  height: 50px;
  background-color: #636363;
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
    background-color: #8d8d8d;
  }
`;

const LetterWriteButton = styled.button`
  position: absolute;
  bottom: -6px;
  left: 386px;
  width: 50px;
  height: 50px;
  background-color: #b84d4d;
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
    background-color: #e75252;
  }
`;

const MailList = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

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
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-right: 10px;
  cursor: pointer;
`;

const MailCheckBtn = styled.input.attrs({ type: 'checkbox' })`
  /* 기본 체크박스 숨기기 */
  appearance: none;
  margin: 8px;
  min-width: 20px;
  height: 20px;
  border: 2px solid #5a5a5a;
  border-radius: 4px;
  cursor: pointer;

  /* 체크 시 스타일 */
  &:checked {
    background-color: #5a5a5a;
    border-color: #5a5a5a;
  }

  /* 체크 표시 추가 (가상 요소 활용) */
  &:checked::after {
    content: '✔';
    color: white;
    display: block;
    text-align: center;
    margin-top: -2px;
    font-size: 16px;
  }
`;

const MailItemColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  position: relative;
  width: calc( 100% - 32px);
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

const Subject = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 8px);
  display: block; /* 추가 */
`;

const TimeReceived = styled.div`
  color: #888;
`;

export default DeleteLetterModal;
