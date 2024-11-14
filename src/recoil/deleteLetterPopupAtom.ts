import { atom } from "recoil";


/**  letter delete popup 상태 */
export const deleteLetterPopupState = atom<boolean>({
  key: "deleteLetterPopupState", // 고유 키
  default: false, // 초기값 false
});