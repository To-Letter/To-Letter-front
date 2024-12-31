/**
 * 이메일 인증 타입 구분
 * @params signup: 회원가입 이메일 인증
 * @params updatePass: 비밀번호 변경 이메일 인증
 * */
export const emailVerifyAuthType: {
  signup: string;
  updatePass: string;
} = {
  signup: "secondAuth",
  updatePass: "updatePW",
};
