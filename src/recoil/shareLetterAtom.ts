import { atom } from "recoil";

// 2번 letter popup 상태
export const shareLetterState = atom<boolean>({
  key: "shareLetterState", // 고유 키
  default: false, // 초기값 false
});
