// src/components/organisms/letter/LetterItem.tsx
import { formatDate } from "@/utils/formatDate";
import styled from "styled-components";

/**
 * @returns 편지 아이템 컴포넌트 UI
 * @param letter 편지 데이터
 * @param onClick 편지 클릭 이벤트 핸들러
 * @param type 편지 리스트 타입(받은 편지, 보낸 편지)
 */
interface LetterItemProps {
  letter: {
    id: number;
    sender: string;
    subject: string;
    timeReceived: string;
    viewCheck?: boolean; // 읽음 여부 (받은 편지함에서만 사용)
  };
  onClick: (letterId: number) => void;
  type: "receive" | "send"; // 받은/보낸 편지함 구분
}

export const LetterItem = ({ letter, onClick, type }: LetterItemProps) => {
  return (
    <MailItem onClick={() => onClick(letter.id)}>
      <MailItemColumnWrap>
        <MailItemRowWrap>
          <Sender>
            {type === "receive" && !letter.viewCheck && (
              <UnreadIcon src="/images/letter_reading_icon.jpg" alt="Unread" />
            )}
            {letter.sender}
          </Sender>
          <TimeReceived>{formatDate(letter.timeReceived)}</TimeReceived>
        </MailItemRowWrap>
        <Subject>{letter.subject}</Subject>
      </MailItemColumnWrap>
    </MailItem>
  );
};

const MailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
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
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UnreadIcon = styled.img`
  width: 18px;
  height: 12px;
`;

const Subject = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
`;

const TimeReceived = styled.div`
  color: #888;
`;

export default LetterItem;
