import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import sessionStorageService from "../utils/sessionStorageService";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
});

axiosInterceptor.interceptors.response.use(
  async (response: any) => {
    try {
      const accessToken = response.headers?.get("authorization");
      const refreshToken = response.headers?.get("refreshtoken");
   
    if(accessToken !== undefined && refreshToken !== undefined){
      sessionStorageService.set("accessToken", accessToken);
      sessionStorageService.set("refreshToken", refreshToken);
    }
      
    } catch (error) {
      console.error("axiosInterceptor error")
    }
    
    return response;
  },
  async (error) => {
    if (error.response.data.code === 1003 || error.response.data.code === 1002) {
      alert('로그인 유지 시간이 만료되었습니다. 재로그인 해주세요.')
      sessionStorageService.delete();
      window.location.href = '/'
    }
  }
);

export default axiosInterceptor;
