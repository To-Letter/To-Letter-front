import sessionStorageService from "./sessionStorageService";

const authorization = () => {
  return {
    headers: {
      Authorization: `${sessionStorageService.get("accessToken")}`,
      refreshToken: `${sessionStorageService.get("refreshToken")}`,
      // 아래는 cors 이슈 확인 후 추가한 구문으로, 효과 X
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    },
    
    withCredentials: true,
  };
};

export default authorization;
