import sessionStorageService from "./sessionStorageService";

const authorization = () => {
  return {
    headers: {
      Authorization: `${sessionStorageService.get("accessToken")}`,
      refreshToken: `${sessionStorageService.get("refreshToken")}`,
    },
    
    withCredentials: true,
  };
};

export default authorization;
