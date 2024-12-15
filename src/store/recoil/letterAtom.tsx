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

interface nicknameAndContentsType {
  nickname: string;
  contents: string;
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

// 받는 유저의 닉네임과 편지 내용을 관리하는 recoil
export const nicknameAndContentsState = atom<nicknameAndContentsType>({
  key: "nicknameAndContentsState", // 고유 키
  default: {
    nickname: "",
    contents: "",
  },
});

/**  new letter 도착 alarm  상태 */
export const newLetterAlarmState = atom<boolean>({
  key: "newLetterAlarmState", // 고유 키
  default: false, // 초기값 false
});
