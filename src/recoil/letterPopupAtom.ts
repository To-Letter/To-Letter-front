import { atom } from "recoil";

interface individualLetterState {
  isOpen: boolean;
  id: number;
  toUserNickname: string;
  letterContent: string;
  fromUserNickname: string;
  onDelete: boolean;
}

// 2번 letter popup 상태
export const letterPopupState = atom<boolean>({
  key: "letterPopupState", // 고유 키
  default: false, // 초기값 false
});

// 3번 편지 보내기 최종 확인 모달창
export const sendLetterModalState = atom<boolean>({
  key: "sendLetterModalState", // 고유 키
  default: false, // 초기값 false
});

// 받은 편지함 모달창
export const receiveLetterBoxModalState = atom<boolean>({
  key: "receiveLetterBoxModalState", // 고유 키
  default: false, // 초기값 false
});

// 편지 내용 상태
export const letterContentState = atom<string>({
  key: "letterContentState", // 고유 키
  default: "", // 초기값 false
});

// 개별 편지함 모달창
export const individualLetterState = atom<individualLetterState>({
  key: "individualLetterState", // 고유 키
  default: {
    isOpen: false,
    id: -9999,
    toUserNickname: "",
    letterContent: "",
    fromUserNickname: "",
    onDelete: false,
  },
});
