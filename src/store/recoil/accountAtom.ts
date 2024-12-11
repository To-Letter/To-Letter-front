import { atom } from "recoil";

interface myInfoI {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  loginType: "localLogin" | "kakaoLogin" | "";
}

// 이메일 입력값 상태
export const emailState = atom<string>({
  key: "emailState", // 고유 키
  default: "", // 유저가 입력한 이메일 값
});

export const myInfoState = atom<myInfoI>({
  key: "myInfoState",
  default: {
    isLogin: false,
    address: "",
    email: "",
    nickname: "",
    loginType: "",
  },
});
