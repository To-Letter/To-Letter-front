import { atom } from "recoil";

interface myInfoType {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  userRole: "local" | "kakao";
}

interface SignupType {
  nickname: string;
  email: string;
  password: string;
  mailboxAddress: string;
}

export const signupState = atom<SignupType>({
  key: "signupState",
  default: {
    nickname: "",
    email: "",
    password: "",
    mailboxAddress: "",
  },
});

export const myInfoState = atom<myInfoType>({
  key: "myInfoState",
  default: {
    isLogin: true,
    address: "경기도 군포시 한세로 30",
    email: "test@test.com",
    nickname: "test",
    userRole: "local",
  },
});
