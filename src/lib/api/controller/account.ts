import sendApi from "@/lib/api/sendApi";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

/**
 * 토큰 삭제 함수(헤더 + 쿠키용)
 * */
/* const clearTokens = () => {
  // Authorization 헤더 삭제
  delete axiosInterceptor.defaults.headers.common["Authorization"];
  delete axiosInterceptor.defaults.headers.common["refreshToken"];

  // refreshToken 쿠키 삭제
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}; */

/**
 * 토큰 삭제 함수(기본 헤더용)
 */
const clearTokens = () => {
  delete axiosInterceptor.defaults.headers.common["Authorization"];

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  // refreshToken 쿠키 삭제
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * 로그인 요청
 * @param email 이메일
 * @param password 비밀번호
 * @returns response
 */
export const postLocalLogin = async (loginData: {
  email: string;
  password?: string;
}) => {
  const response: any = await sendApi.post(`/users/su/login`, {
    email: loginData.email,
    password: loginData.password,
  });

  const accessToken = response.headers.get("authorization");

  if (accessToken) {
    axiosInterceptor.defaults.headers.common[
      "Authorization"
    ] = `${accessToken}`;
  }

  return response;
};

/**
 * 회원가입 요청
 * @param nickname 닉네임
 * @param email 이메일
 * @param loginType 로그인 타입
 * @param password 비밀번호
 * @param address 주소
 * @returns response
 */
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

/**
 * 닉네임 중복확인 요청
 * @param nickname 닉네임
 * @returns response
 */
export const getNicknameConfirm = async (nickname: { nickname: string }) => {
  const queryString = `?userNickname=${encodeURIComponent(nickname.nickname)}`;
  const response: any = await sendApi.get(
    `/users/su/confirmNickname${queryString}`
  );

  return response;
};

/**
 * 이메일 중복확인 요청
 * @param email 이메일
 * @returns response
 */
export const getEmailConfirm = async (email: { email: string }) => {
  const queryString = `?userEmail=${encodeURIComponent(email.email)}`;
  const response: any = await sendApi.get(
    `/users/su/confirmEmail${queryString}`
  );

  return response;
};

/**
 * 회원가입을 위한 이메일 인증코드 발송 요청
 * @param email 이메일
 * @returns response
 */
export const getEmialAuth = async (email: { email: string }) => {
  const queryString = `?toEmail=${encodeURIComponent(email.email)}`;
  const response: any = await sendApi.get(`/users/email/auth${queryString}`);

  return response;
};

/**
 * 이메일 인증 요청(회원가입, 비밀번호 업데이트)
 * @param email: string;
 * @param randomCode: string;
 * @param authType: string;
 * @returns response
 */
export const postEmailVerify = async (emailData: {
  email: string;
  randomCode: string;
  authType: string;
}) => {
  const response: any = await sendApi.post(`/users/email/verify`, {
    email: emailData.email,
    randomCode: emailData.randomCode,
    authType: emailData.authType,
  });

  return response;
};

/**
 * 비밀번호 변경을 위한 이메일 인증코드 발송
 * @param email: 이메일 값
 * @returns response
 */
export const getFindMailAuth = async (email: string) => {
  const queryString = `?email=${encodeURIComponent(email)}`;
  const response: any = await sendApi.get(
    `/users/find/sendEmail${queryString}`
  );

  return response;
};

/**
 * kakao Login Api Part - 인가코드 가져오기
 * @returns response
 */
export const getKakaoURL = async () => {
  const response: any = await sendApi.get("/kakao/su/auth");

  return response;
};

/**
 * 인가코드 전달 및 카카오 정보로 1차 회원가입 진행
 * @param code: 전달 받은 코드 값
 * @returns response
 */
export const postKakaoToken = async (code: { code: string }) => {
  const queryString = `?code=${encodeURIComponent(code.code)}`;
  try {
    const response: any = await sendApi.post(`/kakao/su/token${queryString}`);

    if (response.data.responseCode === 201) {
      /* 이미 회원가입이 되있는 유저에 대한 토큰 저장 -> 로그인 */
      const accessToken = response.headers.get("authorization");
      const refreshToken = response.headers.get("refreshToken");

      if (accessToken) {
        axiosInterceptor.defaults.headers.common[
          "Authorization"
        ] = `${accessToken}`;
      }

      if (refreshToken) {
        axiosInterceptor.defaults.headers.common["refreshToken"] = refreshToken;
      }
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

/**
 * 2차 유저정보 수집후 회원가입 진행
 * @param address: 주소 값;
 * @param email: 이메일 값;
 * @param nickname: 닉넥임;
 * @returns response
 */
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

/**
 * 로그아웃 처리
 * @returns response
 */
export const getLogout = async () => {
  try {
    const response = await sendApi.get(`/users/logout`);

    if (response.data.responseCode === 200) {
      clearTokens();
    }

    return response;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

/**
 * 유저 정보 업데이트
 * @param address-주소 값
 * @param nickname-닉네임
 * @returns response
 */
export const patchUserInfoUpdate = async (updateData: {
  address: string;
  nickname: string;
}) => {
  const response: any = await sendApi.patch(`/users/update`, {
    address: updateData.address,
    nickname: updateData.nickname,
  });

  return response;
};

/**
 * 비밀번호 변경 요청
 * @param changePassword 변경 비밀번호
 * @param email 이메일
 * @returns response
 */
export const patchPasswordUpdate = async ({
  changePassword,
  email,
}: {
  changePassword: string;
  email: string;
}) => {
  const response: any = await sendApi.patch(`/users/find/updatePW`, {
    changePassword: changePassword,
    email: email,
  });

  if (response.data.responseCode === 200) {
    clearTokens();
  }
  return response;
};

/**
 * 로컬 회원 탈퇴
 * @param email 로그인 이메일
 * @param passworf 비밀번호
 * @returns response 200 성공/그외 실패
 */
export const deleteLocalUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response: any = await sendApi.delete(`/users/delete`, {
    email: email,
    password: password,
  });
  if (response.data.responseCode === 200) {
    clearTokens();
  }
  return response;
};

/**
 * kakao 회원 탈퇴를 위한 인가코드 가져오기
 * @returns response
 */
export const getKakaoDeleteURL = async () => {
  const response: any = await sendApi.get("/kakao/su/auth/delete");

  return response;
};

/**
 * 인가코드 전달 받아  회원 탈퇴 진행
 * @param code: 전달 받은 코드 값
 * @returns response
 */
export const deleteKakaoUser = async ({ code }: { code: string }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (accessToken) {
    axiosInterceptor.defaults.headers.common["Authorization"] = accessToken;
  }
  if (refreshToken) {
    axiosInterceptor.defaults.headers.common["refreshToken"] = refreshToken;
  }

  const queryString = `?code=${encodeURIComponent(code)}`;
  const response: any = await sendApi.delete(`/kakao/delete${queryString}`);

  if (response.data.responseCode === 200) {
    clearTokens();
  }
  return response;
};
