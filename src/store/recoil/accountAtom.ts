import { atom } from "recoil";

interface myInfoType {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  loginType: "localLogin" | "kakaoLogin" | "";
}

interface SignupType {
  nickname: string;
  email: string;
  password: string;
  mailboxAddress: string;
  type: "signup" | "kakao" | "myInfo";
}

export const signupState = atom<SignupType>({
  key: "signupState",
  default: {
    nickname: "",
    email: "",
    password: "",
    mailboxAddress: "",
    type: "signup",
  },
});

export const myInfoState = atom<myInfoType>({
  key: "myInfoState",
  default: {
    isLogin: false,
    address: "",
    email: "",
    nickname: "",
    loginType: "",
  },
});
