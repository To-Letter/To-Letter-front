import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import sessionStorageService from "../utils/sessionStorageService";
import authorization from "../utils/httpService";
import axiosInterceptor from "./axiosInterceptor";



export const sendApi = {
  
  get: (url: string) => {
    const accessToken = sessionStorageService.get("accessToken");
    // accessToken 존재시 즉, 로그인한 상태
    if (accessToken !== null) {
      return axiosInterceptor.get(
        AUTH_KEY.apiUrl + url,
        //기본 헤더 설정, 엑세스 토큰 및 리프레시 토큰 설정
        authorization()
      );
    } else {
      return axios.get(AUTH_KEY.apiUrl + url, { withCredentials: true });
    }
  },

  post: (url: string, req: object = {}) => {
    return axiosInterceptor.post(
      AUTH_KEY.apiUrl + url,
      req,
      authorization()
    );
  },

  put: (url: string, req: object = {}) => {
    return axiosInterceptor.put(
      AUTH_KEY.apiUrl + url,
      req,
      authorization()
    );
  },

  delete: (url: string) => {
    return axiosInterceptor.delete(
      AUTH_KEY.apiUrl + url,
      authorization()
    );
  },
};

export default sendApi;
