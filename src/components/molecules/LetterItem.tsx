// src/components/organisms/letter/LetterItem.tsx
import { ElementBox } from "@/components/atoms/Box";
import { formatDate } from "@/utils/formatDate";
import styled from "styled-components";

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
  children?: React.ReactNode | null;
}

/**
 * @returns 편지 아이템 컴포넌트 UI
 * @param letter 편지 데이터
 * @param onClick 편지 클릭 이벤트 핸들러
 * @param type 편지 리스트 타입(받은 편지, 보낸 편지)
 * @param children 체크 박스등 왼쪽에 둘 수 있는 컴포넌트
 */
export const LetterItem = ({
  letter,
  onClick,
  type,
  children = null,
}: LetterItemProps) => {
  return (
    <MailItem
      onClick={() => onClick(letter.id)}
      $width="396px"
      $alignItems="center"
      $justifyContent="space-between"
      $padding="10px"
    >
      {children !== null && children}

      <ElementBox
        $direction="column"
        $width={children !== null ? "calc(100% - 32px)" : "100%"}
        $height="100%"
        $alignItems="start"
      >
        <ElementBox
          $direction="row"
          $width="100%"
          $height="100%"
          $justifyContent="space-between"
          $alignItems="center"
          $margin="0px 0px 5px 0px"
        >
          <Sender>
            {type === "receive" && !letter.viewCheck && (
              <UnreadIcon src="/images/letter_reading_icon.jpg" alt="Unread" />
            )}
            {letter.sender}
          </Sender>
          <TimeReceived>{formatDate(letter.timeReceived)}</TimeReceived>
        </ElementBox>
        <Subject>{letter.subject}</Subject>
      </ElementBox>
    </MailItem>
  );
};

const MailItem = styled(ElementBox)`
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Sender = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
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
  color: #e4e4e4;
`;

const TimeReceived = styled.div`
  color: #888;
`;

export default LetterItem;
