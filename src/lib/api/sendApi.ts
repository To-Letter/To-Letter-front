import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import axiosInterceptor from "./axiosInterceptor";

export const sendApi = {
  get: (url: string) => {
    const accessToken =
      axiosInterceptor.defaults.headers.common["Authorization"];

    // accessToken 존재시 즉, 로그인한 상태
    if (accessToken !== null) {
      return axiosInterceptor.get(AUTH_KEY.apiUrl + url);
    } else {
      return axios.get(AUTH_KEY.apiUrl + url, { withCredentials: true });
    }
  },

  post: (url: string, req: object = {}) => {
    return axiosInterceptor.post(AUTH_KEY.apiUrl + url, req, {
      withCredentials: true,
    });
  },

  put: (url: string, req: object = {}) => {
    return axiosInterceptor.put(AUTH_KEY.apiUrl + url, req, {
      withCredentials: true,
    });
  },

  patch: (url: string, req: object = {}) => {
    return axiosInterceptor.patch(AUTH_KEY.apiUrl + url, req, {
      withCredentials: true,
    });
  },

  delete: (url: string, req: object = {}) => {
    return axiosInterceptor.delete(AUTH_KEY.apiUrl + url, {
      data: req,
      withCredentials: true,
    });
  },
};

export default sendApi;
