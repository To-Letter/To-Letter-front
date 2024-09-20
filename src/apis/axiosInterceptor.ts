import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import { SESSION_ACCESSTOKEN_KEY, SESSION_REFRESHTOKEN_KEY } from "../constants/session";
import sessionStorageService from "../utils/sessionStorageService";
import { getReissue } from "./controller/account";

axios.defaults.withCredentials = true;

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("axiosInterceptor error:", error)
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
      console.error("axiosInterceptor error")
    }
    
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
