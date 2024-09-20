import sessionStorageService from "./sessionStorageService";

const authorization = () => {
  return {
    headers: {
      Authorization: `${sessionStorageService.get("accessToken")}`,
      refreshToken: `${sessionStorageService.get("refreshToken")}`,
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    },
    
    withCredentials: true,
  };
};

export default authorization;
