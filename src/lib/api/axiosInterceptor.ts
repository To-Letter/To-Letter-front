import axios from "axios";
import { AUTH_KEY } from "@/constants/authkey";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": `${AUTH_KEY.apiUrl}`,
    "Access-Control-Allow-Credentials": "true",
  },
});

/**
 * 요청 인터셉터
 */
axiosInterceptor.interceptors.request.use(
  async (config) => {
    const accessToken =
      axiosInterceptor.defaults.headers.common["Authorization"];
    const refreshToken =
      axiosInterceptor.defaults.headers.common["refreshToken"];

    /* 두 토큰 모두 요청 헤더에 포함 */
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    if (refreshToken) {
      config.headers["refreshToken"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 */
axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    /* 토큰 관련 에러 처리 */
    const errorCode = error.response?.data.code;

    switch (errorCode) {
      case 1001: // 유효하지 않은 토큰
      case 1002: // 빈 문자열 토큰
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/";
        break;

      case 1003: // 만료된 토큰
      case 1004: // 변조된 토큰
      case 1005: // 잘못된 접근
        alert("다시 로그인해주세요.");
        window.location.href = "/";
        break;

      default:
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptor;
