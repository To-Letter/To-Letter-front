import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import { getReissue } from "./controller/account";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    try {
      if (error.response.data.code === 1003 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await getReissue();
          originalRequest.headers['Authorization'] = `${res.headers.get("authorization")}`;
          originalRequest.headers['refreshToken'] = `${res.headers.get("refreshtoken")}`;
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
