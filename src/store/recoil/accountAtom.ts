import { atom } from "recoil";

/** 유저 정보 타입 */
interface myInfoType {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  userRole: "localLogin" | "kakaoLogin" | "";
}

/** 회원가입 정보 타입 */
interface SignupType {
  nickname: string;
  isNicknameChecked: boolean;
  email: string;
  isEmailChecked: boolean;
  password: string;
  mailboxAddress: string;
}

/** 회원가입 정보 관리 recoil */
export const signupState = atom<SignupType>({
  key: "signupState",
  default: {
    nickname: "",
    isNicknameChecked: false,
    email: "",
    isEmailChecked: false,
    password: "",
    mailboxAddress: "",
  },
});

/** 유저 정보 관리 recoil */
export const myInfoState = atom<myInfoType>({
  key: "myInfoState",
  default: {
    isLogin: false,
    address: "",
    email: "",
    nickname: "",
    userRole: "",
  },
});
