import sendApi from "../sendApi";
import sessionStorageService from "../../utils/sessionStorageService";

export const postLocalLogin = async (loginData: {
  email: string;
  password?: string;
}) => {
  const response: any = await sendApi.post(`/users/su/login`, {
    email: loginData.email,
    password: loginData.password,
  });

  // 각각의 토큰 저장
  const accessToken = response.headers.get("authorization");
  const refreshToken = response.headers.get("refreshtoken");

  sessionStorageService.set("accessToken", accessToken);
  sessionStorageService.set("refreshToken", refreshToken);
  return response;
};

// 회원가입
export const postLocalSignup = async (signupData: {
  nickname: string;
  email: string;
  loginType: string;
  password: string;
  address: string;
}) => {
  const response: any = await sendApi.post(`/users/su/signup`, {
    nickname: signupData.nickname,
    email: signupData.email,
    loginType: signupData.loginType,
    password: signupData.password,
    address: signupData.address,
  });

  return response;
};

// 닉네임 중복확인
export const getNicknameConfirm = async (nickname: { nickname: string }) => {
  const queryString = `?userNickname=${encodeURIComponent(nickname.nickname)}`;
  const response: any = await sendApi.get(
    `/users/su/confirmNickname${queryString}`
  );

  return response;
};

// 이메일 중복확인
export const getEmialConfirm = async (email: { email: string }) => {
  const queryString = `?userEmail=${encodeURIComponent(email.email)}`;
  const response: any = await sendApi.get(
    `/users/su/confirmEmail${queryString}`
  );

  return response;
};

// 이메일 인증코드 발송
export const getEmialAuth = async (email: { email: string }) => {
  const queryString = `?toEmail=${encodeURIComponent(email.email)}`;
  const response: any = await sendApi.get(`/users/email/auth${queryString}`);

  return response;
};

// 이메일 인증 요청
export const postEmailVerify = async (emailData: {
  email: string;
  randomCode: string;
}) => {
  const response: any = await sendApi.post(`/users/email/verify`, {
    email: emailData.email,
    randomCode: emailData.randomCode,
  });

  return response;
};

export const getReissue = async () => {
  const response: any = await sendApi.get(`/users/reissue`);

  const accessToken = response.headers.get("authorization");
  const refreshToken = response.headers.get("refreshtoken");

  sessionStorageService.set("accessToken", accessToken);
  sessionStorageService.set("refreshToken", refreshToken);

  return response;
};

export const getLogout = async () => {
  const response: any = await sendApi.get(`/users/logout`);

  sessionStorageService.delete();

  return response;
};
