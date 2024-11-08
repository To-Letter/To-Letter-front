import { atom } from "recoil";

// 로딩 상태를 관리하는 Recoil atom
export const letterPopupState = atom<boolean>({
  key: "letterPopupState", // 고유 키
  default: false, // 초기값 false
});

export const sendLetterModalState = atom<boolean>({
  key: "sendLetterModalState", // 고유 키
  default: false, // 초기값 false
});

export const receiveLetterBoxModalState = atom<boolean>({
  key: "receiveLetterBoxModalState", // 고유 키
  default: false, // 초기값 false
});

export const letterContentState = atom<string>({
  key: "letterContentState", // 고유 키
  default: "", // 초기값 false
});
