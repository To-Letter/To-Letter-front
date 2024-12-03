import { atom } from 'recoil';

interface myInfoI {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  loginType: "localLogin"|"kakaoLogin"|""
}

// 로딩 상태를 관리하는 Recoil atom
export const myPageModalState = atom<boolean>({
  key: 'myPageModalState', // 고유 키
  default: false, // 초기값 false
});

export const myInfoState = atom<myInfoI>({
  key: 'myInfoState',
  default: {
    isLogin: false,
    address: "",
    email: "",
    nickname: "",
    loginType: "",
  }
})