import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosMail, IoMdSearch } from "react-icons/io"; // 메일 버튼
import useDebounce from "../../hook/useDebounce";

interface Mail {
  sender: string;
  subject: string;
  timeReceived: string;
}

const Mailbox: React.FC = () => {
  // test mail data
  const [mails, setMails] = useState<Mail[]>([]);
  const [receiveMails] = useState<Mail[]>([
    {
      sender: "김재윤",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀",
      subject:
        "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼 보내버리기 제출 알아서 하쇼. 보내버리기 제출 알아서 하쇼....",
      timeReceived: "01.09",
    },
    {
      sender: "정보원",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    // ...더 많은 메일 데이터
  ]);

  const [sendMails] = useState<Mail[]>([
    {
      sender: "김재윤2",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀3",
      subject: "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼...",
      timeReceived: "01.09",
    },
    {
      sender: "정보원4",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    {
      sender: "김재윤2",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀3",
      subject: "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼...",
      timeReceived: "01.09",
    },
    {
      sender: "정보원4",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    {
      sender: "김재윤2",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀3",
      subject: "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼...",
      timeReceived: "01.09",
    },
    {
      sender: "정보원4",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    {
      sender: "김재윤2",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀3",
      subject: "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼...",
      timeReceived: "01.09",
    },
    {
      sender: "정보원4",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    {
      sender: "김재윤2",
      subject: "To. Letter 이대로 괜찮은가 이사진 논의중...",
      timeReceived: "09:46",
    },
    {
      sender: "인사팀3",
      subject: "아몰랑 공문 하루전에 보내버리기 제출 알아서 하쇼...",
      timeReceived: "01.09",
    },
    {
      sender: "정보원4",
      subject: "니네 기록물 다시 검사한다...",
      timeReceived: "01.09",
    },
    // ...더 많은 메일 데이터
  ]);
  const [tab, setTab] = useState("received"); // "received" or "send"
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  useEffect(() => {
    fetchMails(tab);
  }, [tab, debouncedSearchTerm]);

  const fetchMails = async (type: string) => {
    // 여기에 API 호출 코드를 작성해줘
    // 임시로 예시 데이터 사용
    // const response = await fetch(`https://api.example.com/mails?type=${type}`);
    // const data = await response.json();
    // setMails(data);

    // 검색어 필터링
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

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <MailboxWrap>
          <Header>
            <Tab
              active={tab === "received"}
              onClick={() => handleTabChange("received")}
            >
              받은 편지함
            </Tab>
            <Tab
              active={tab === "send"}
              onClick={() => handleTabChange("send")}
            >
              보낸 편지함
            </Tab>
          </Header>
          <SearchBar
            placeholder="메일 검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MailList>
            {mails.map((mail, index) => (
              <MailItem key={index}>
                <MailItemColumnWrap>
                  <MailItemRowWrap>
                    <Sender>{mail.sender}</Sender>
                    <TimeReceived>{mail.timeReceived}</TimeReceived>
                  </MailItemRowWrap>
                  <Subject>{mail.subject}</Subject>
                </MailItemColumnWrap>
              </MailItem>
            ))}
          </MailList>
          <ComposeButton>
            <IoIosMail />
          </ComposeButton>
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
  position: relative; /* 추가: 자식의 위치를 기준으로 삼기 위해 */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 10px 20px;
  background-color: ${({ active }) =>
    active ? "rgba(75, 75, 75, 0.1);" : "transparent"};
  color: ${({ active }) => (active ? "#fff" : "#ccc")};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(75, 75, 75, 0.1);
    color: #fff;
  }
`;

const SearchWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 10px;
  padding: 12px 0px;
  margin-top: 6px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #848484;
  }
`;

const ComposeButton = styled.button`
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
