import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import sessionStorageService from "../utils/sessionStorageService";
import authorization from "../utils/httpService";
import axiosInterceptor from "./axiosInterceptor";



export const sendApi = {
  
  get: (url: string) => {
    const accessToken = sessionStorageService.get("accessToken");
    if (accessToken !== null) {
      return axiosInterceptor.get(
        AUTH_KEY.apiUrl + url,
        authorization()
      );
    } else {
      return axios.get(AUTH_KEY.apiUrl + url, { withCredentials: true });
    }
  },

  guestGet: (url: string) => {
    return axios.get(AUTH_KEY.apiUrl + url);
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
