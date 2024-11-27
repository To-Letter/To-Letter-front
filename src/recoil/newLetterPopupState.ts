import { atom } from "recoil";


/**  new letter List popup 상태 */
export const newLetterPopupState = atom<boolean>({
  key: "newLetterPopupState", // 고유 키
  default: false, // 초기값 false
});

/**  new letter 도착 alarm  상태 */
export const newLetterAlarmState = atom<boolean>({
  key: "newLetterAlarmState", // 고유 키
  default: false, // 초기값 false
});

