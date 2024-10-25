import { atom } from 'recoil';

// 모달 상태의 타입 정의
interface accountModalState {
  isOpen: boolean;
  type: 'login' | 'signup' | 'kakaoSignup' | 'MailVerify' | null;
}

// 모달 열림/닫힘 상태
export const accountModalState = atom<accountModalState>({
  key: 'accountModalState', // 고유 키
  default: {
    isOpen: false,
    type: null, // 초기값
  },
});

// 이메일 입력값 상태
export const emailState = atom<string>({
  key: 'emailState', // 고유 키
  default: '', // 유저가 입력한 이메일 값
});