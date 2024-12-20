import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { individualLetterState } from "@/store/recoil/letterAtom";
import { formatDate } from "../../../utils/formatDate";
import { useRouter } from "next/navigation";

interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
}

const mails = [
  {
    id: 1,
    sender: "sd",
    timeReceived: "2024-11-27T12:34:56",
    subject: "허거덩",
  },
];
export default function NewLetterContents() {
  const router = useRouter();
  /* 개별 편지 내용 recoil */
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

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
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <MailboxWrap>
          <Header>
            <Tab>새로 도착한 편지</Tab>
            <Exit onClick={() => router.push("/")}>X</Exit>
          </Header>

          <MailList>
            {mails.map((mail) => (
              <MailItem key={mail.id}>
                <MailItemColumnWrap onClick={() => handleMailItemClick(mail)}>
                  <MailItemRowWrap>
                    <Sender>{mail.sender}</Sender>
                    <TimeReceived>{formatDate(mail.timeReceived)}</TimeReceived>
                  </MailItemRowWrap>
                  <Subject>{mail.subject}</Subject>
                </MailItemColumnWrap>
              </MailItem>
            ))}
          </MailList>
        </MailboxWrap>
      </ModalContent>
    </ModalOverlay>
  );
}

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
  margin: 0 20px;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 10px 20px;
  background-color: rgba(75, 75, 75, 0.1);
  color: #fff;
  border: none;
  cursor: default;
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
  cursor: pointer;
`;

const MailItemColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  position: relative;
  width: 100%;
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
