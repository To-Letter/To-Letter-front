import { atom } from "recoil";

interface myInfoType {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  loginType: "localLogin" | "kakaoLogin" | "";
}

interface SignupType {
  nickName: string;
  email: string;
  password: string;
  mailboxAddress: string;
}

export const signupState = atom<SignupType>({
  key: "signupState",
  default: {
    nickName: "",
    email: "",
    password: "",
    mailboxAddress: "",
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
