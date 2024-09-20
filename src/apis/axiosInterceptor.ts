import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import { SESSION_ACCESSTOKEN_KEY, SESSION_REFRESHTOKEN_KEY } from "../constants/session";
import sessionStorageService from "../utils/sessionStorageService";
import { getReissue } from "./controller/account";

axios.defaults.withCredentials = true;
//토큰 만료시 후처리 인터셉터(현재 검증 안 됨)
const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("axiosInterceptor error(cors관련X):", error)
    try {
      if (error?.response.status === 1003 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await getReissue();
          return axiosInterceptor(originalRequest);
        } catch (err) {
          console.error("Token refresh failed", err);
          // Handle token refresh failure (e.g., redirect to login)
        }
      }
    } catch (error) {
      console.error("axiosInterceptor error(cors관련X)")
    }
    
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
