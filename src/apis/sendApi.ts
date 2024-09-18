import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";
import { SESSION_KEY } from "../constants/session";
import sessionStorageService from "../utils/sessionStorageService";
import authorization from "../utils/httpService";
import axiosInterceptor from "./axiosInterceptor";

export const sendApi = {
  get: (url: string) => {
    const accessToken = sessionStorageService.get(SESSION_KEY, "accessToken");
    if (accessToken !== null) {
      return axiosInterceptor.get(
        AUTH_KEY.apiUrl + url,
        authorization(accessToken)
      );
    } else {
      return axios.get(AUTH_KEY.apiUrl + url, { withCredentials: true });
    }
  },

  guestGet: (url: string) => {
    return axios.get(AUTH_KEY.apiUrl + url);
  },

  post: (url: string, req: object = {}) => {
    const accessToken = sessionStorageService.get(SESSION_KEY, "accessToken");
    return axiosInterceptor.post(
      AUTH_KEY.apiUrl + url,
      req,
      authorization(accessToken)
    );
  },

  put: (url: string, req: object = {}) => {
    const accessToken = sessionStorageService.get(SESSION_KEY, "accessToken");
    return axiosInterceptor.put(
      AUTH_KEY.apiUrl + url,
      req,
      authorization(accessToken)
    );
  },

  delete: (url: string) => {
    const accessToken = sessionStorageService.get(SESSION_KEY, "accessToken");
    return axiosInterceptor.delete(
      AUTH_KEY.apiUrl + url,
      authorization(accessToken)
    );
  },
};

export default sendApi;
