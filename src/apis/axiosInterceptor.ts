import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import { SESSION_KEY } from "../constants/session";
import sessionStorageService from "../utils/sessionStorageService";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 1003 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorageService.get(SESSION_KEY, "refreshToken");
        const response = await axios.post(`${AUTH_KEY.apiUrl}/users/reissue`, { refreshToken });
        const { accessToken } = response.data;
        sessionStorageService.set(SESSION_KEY, JSON.stringify({ JWTDataState: { accessToken, refreshToken } }));
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInterceptor(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        // Handle token refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
