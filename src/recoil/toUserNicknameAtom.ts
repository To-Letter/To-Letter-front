import { atom } from "recoil";

// 닉네임 확인 모달창 상태를 관리하는 Recoil atom
export const toUserNicknameModalState = atom<boolean>({
  key: "toUserNicknameModalState", // 고유 키
  default: false, // 초기값 false
});

// 편지 받는 사람의 닉네임 상태를 관리하는 Recoil atom
export const toUserNicknameState = atom<string>({
  key: "toUserNicknameState", // 고유 키
  default: "", // 초기값 ""
});
