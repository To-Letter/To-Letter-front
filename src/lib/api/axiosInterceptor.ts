import axios from "axios";
import { AUTH_KEY } from "@/constants/authkey";
import sendApi from "@/lib/api/sendApi";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": `${process.env.REACT_APP_SERVER_URL}`,
    "Access-Control-Allow-Credentials": "true",
  },
});

// 재발급 토큰 요청 함수
async function getNewToken() {
  const response = await sendApi.post(`${AUTH_KEY.apiUrl}/auth/reissue`);

  return response.headers["Authorization"];
}

// 요청 인터셉터
axiosInterceptor.interceptors.request.use(
  async (config: any) => {
    const accessToken =
      axiosInterceptor.defaults.headers.common["Authorization"];

    if (!accessToken) {
      const newAccessToken = await getNewToken();
      config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      axiosInterceptor.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInterceptor.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 에러 코드에 따른 처리
    if (
      (error.response?.data.code === 1002 || // Empty string token
        error.response?.data.code === 1003) && // Expired token
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await getNewToken();
      axiosInterceptor.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInterceptor(originalRequest);
    }

    if (error.response?.data.code === 1006) {
      alert("리프레쉬 토큰이 만료되었습니다. 재로그인 해주세요.");
      window.location.href = "/";
    } else {
      alert("에러가 발생하였습니다.");
      window.location.href = "/error";
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptor;
