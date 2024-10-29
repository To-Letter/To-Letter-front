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

// 회원가입을 위한 이메일 인증코드 발송
export const getEmialAuth = async (email: { email: string }) => {
  const queryString = `?toEmail=${encodeURIComponent(email.email)}`;
  const response: any = await sendApi.get(`/users/email/auth${queryString}`);

  return response;
};

// 이메일 인증 요청
export const postEmailVerify = async (emailData: {
  email: string;
  randomCode: string;
  authType: string;
}) => {
  const response: any = await sendApi.post(`/users/email/verify`, {
    email: emailData.email,
    randomCode: emailData.randomCode,
    authType: emailData.authType
  });

  return response;
};

// 비밀번호 변경을 위한 이메일 인증코드 발송
export const getFindMailAuth = async (email: string) => {
  const queryString = `?email=${encodeURIComponent(email)}`;
  const response: any = await sendApi.get(`/users/find/sendEmail${queryString}`);

  return response;
};

// kakao Login Api Part
// 인가코드 가져오기
export const getKakaoURL = async () => {
  const response: any = await sendApi.get("/kakao/su/auth");

  return response;
};

// 인가코드 전달 및 카카오 정보로 1차 회원가입 진행
export const postKakaoToken = async (code: { code: string }) => {
  const queryString = `?code=${encodeURIComponent(code.code)}`;
  try {
    const response: any = await sendApi.post(`/kakao/su/token${queryString}`);

    if (response.data.responseCode === 201) {
      // 이미 회원가입이 되있는 유저에 대한 토큰 저장 -> 로그인
      const accessToken = response.headers.get("authorization");
      const refreshToken = response.headers.get("refreshtoken");

      sessionStorageService.set("accessToken", accessToken);
      sessionStorageService.set("refreshToken", refreshToken);
    }

    return response;
  } catch (error: any) {
    return {
      data: {
        responseCode: error.response.data.status,
        responseData: error.response.data.code,
        responseMessage: error.response.data.message,
      },
    };
  }
};

// 2차 유저정보 수집후 회원가입 진행
export const postKakaoSignup = async (kakaoSignupData: {
  address: string;
  email: string;
  nickname: string;
}) => {
  const response: any = await sendApi.post(`/kakao/su/signup`, {
    address: kakaoSignupData.address,
    email: kakaoSignupData.email,
    nickname: kakaoSignupData.nickname,
  });

  return response;
};

export const getLogout = async () => {
  const response: any = await sendApi.get(`/users/logout`);

  sessionStorageService.delete();

  return response;
};

export const patchUserInfoUpdate = async (updateData: {
  address: string,
  nickname: string
}) => {
  const response: any = await sendApi.patch(`/users/update`,{
    address: updateData.address,
    nickname: updateData.nickname
  } );

  return response;
};


export const patchPasswordUpdate = async ({changePassword, email}: {
  changePassword: string,
  email: string
}) => {
  const response: any = await sendApi.patch(`/users/find/updatePW`,{
    changePassword: changePassword,
    email: email
  } );

  return response;
};
