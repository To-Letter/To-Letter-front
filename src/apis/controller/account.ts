import sendApi from "../sendApi";
import sessionStorageService from "../../utils/sessionStorageService";

export const postLocalLogin = async (loginData: { email: string; password?: string })  => {
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

export const getReissue = async ()  => {
  const response: any = await sendApi.get(`/users/reissue`);

  const accessToken = response.headers.get("authorization");
  const refreshToken = response.headers.get("refreshtoken");
  
  sessionStorageService.set("accessToken", accessToken);
  sessionStorageService.set("refreshToken", refreshToken);

  return response;
};

export const getLogout = async ()  => {
  const response: any = await sendApi.get(`/users/logout`);

  sessionStorageService.delete();

  return response;
};