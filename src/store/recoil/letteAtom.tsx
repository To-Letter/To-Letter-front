import { atom } from "recoil";

interface individualLetterType {
  isOpen: boolean;
  id: number;
  toUserNickname: string;
  letterContent: string;
  fromUserNickname: string;
  onDelete: boolean;
  tab: "received" | "send";
}

// 개별 편지함 모달창
export const individualLetterState = atom<individualLetterType>({
  key: "individualLetterState", // 고유 키
  default: {
    isOpen: false,
    id: -9999,
    toUserNickname: "",
    letterContent: "",
    fromUserNickname: "",
    onDelete: false,
    tab: "received" as "received" | "send",
  },
});

// tab관리 recoil
export const tabState = atom<"received" | "send">({
  key: "tabState",
  default: "received",
});

// 편지 받는 사람의 닉네임 상태를 관리하는 Recoil atom
export const toUserNicknameState = atom<string>({
  key: "toUserNicknameState", // 고유 키
  default: "", // 초기값 ""
});

/**  new letter 도착 alarm  상태 */
export const newLetterAlarmState = atom<boolean>({
  key: "newLetterAlarmState", // 고유 키
  default: false, // 초기값 false
});
