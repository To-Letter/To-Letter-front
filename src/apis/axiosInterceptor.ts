import axios from "axios";
import { AUTH_KEY } from "../constants/authkey";

const axiosInterceptor = axios.create({
  baseURL: AUTH_KEY.apiUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_URL}`,
    "Access-Control-Allow-Credentials": "true",
  },
});

axiosInterceptor.interceptors.response.use(
  async (response: any) => {
    try {
      const accessToken = response.headers?.get("authorization");

      console.log(`인터셉터 Access token: ${accessToken}`);

      if (accessToken !== undefined) {
        axiosInterceptor.defaults.headers.common[
          "Authorization"
        ] = `${accessToken}`;
      }
    } catch (error) {
      console.error("axiosInterceptor error");
    }

    return response;
  },
  async (error) => {
    if (
      error.response?.data.code === 1003 ||
      error.response?.data.code === 1002
    ) {
      alert("로그인 유지 시간이 만료되었습니다. 재로그인 해주세요.");
      window.location.href = "/";
    } else {
      alert("에러가 발생하였습니다.");
      window.location.href = "/error";
    }
  }
);

export default axiosInterceptor;
