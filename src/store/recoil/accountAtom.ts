import { atom } from "recoil";

/** 유저 정보 타입 */
interface myInfoType {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  userRole: "local" | "kakao";
}

/** 회원가입 정보 타입 */
interface SignupType {
  nickname: string;
  email: string;
  password: string;
  mailboxAddress: string;
}

/** 회원가입 정보 관리 recoil */
export const signupState = atom<SignupType>({
  key: "signupState",
  default: {
    nickname: "",
    email: "",
    password: "",
    mailboxAddress: "",
  },
});

/** 유저 정보 관리 recoil */
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
