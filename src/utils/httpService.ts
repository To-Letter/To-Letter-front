import axiosInterceptor from "../apis/axiosInterceptor";

const authorization = () => {
  const accessToken = axiosInterceptor.defaults.headers.common["Authorization"];
  return {
    headers: {
      Authorization: accessToken,
    },

    withCredentials: true,
  };
};

export default authorization;
