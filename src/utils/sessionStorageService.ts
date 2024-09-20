import { SESSION_ACCESSTOKEN_KEY, SESSION_REFRESHTOKEN_KEY } from "../constants/session";
// SESSION_ACCESSTOKEN_KEY : 엑세스 토큰 key 값 상수 문자열 -'JWTAccountAccessToken'
// SESSION_REFRESHTOKEN_KEY : 리프레시 토큰 key 값 상수 문자열 -'JWTAccountRefresToken'

/**
 * 세션 스토리지 관리
 */
const sessionStorageService = {
  /**
   * 세션 스토리지에 값을 넣는 메소드
   * @param type "accessToken" | "refreshToken"
   * @param value 받아온 토큰 값
   * @returns type과 value를 통해 세션 스토리지에 각각의 토큰을 저장
   */
  set: (type: "accessToken" | "refreshToken", value: string = "") => {
    if(typeof window !== "undefined"){
      if(type === "accessToken"){
        return sessionStorage.setItem(SESSION_ACCESSTOKEN_KEY, value)
      }else if( type === "refreshToken"){
        return sessionStorage.setItem(SESSION_REFRESHTOKEN_KEY, value)
      }
    }
  },
  /**
   * 세션 스토리지에서 값을 가져오는 메소드
   * @param type "accessToken" | "refreshToken"
   * @returns type에 맞는 토큰을 반환, 로그인하지 않았을 경우 null
   */
  get: (type: "accessToken" | "refreshToken") => {
    if(typeof window !== "undefined"){
    const data = type ==="accessToken" 
    ? sessionStorage.getItem(SESSION_ACCESSTOKEN_KEY) 
    : sessionStorage.getItem(SESSION_REFRESHTOKEN_KEY);
    
      if (data) {
        return data;
      }
      return  null;
    }
  },

  /**
   * 세션 스토리지에서 각각의 토큰을 삭제하는 메소드
   * @returns accessToken, refreshToken 토큰 삭제
   */
  delete: () => {
    return typeof window !== "undefined"
      ? (sessionStorage.removeItem(SESSION_ACCESSTOKEN_KEY)
         ,sessionStorage.removeItem(SESSION_REFRESHTOKEN_KEY))
      : null;
  },
};

export default sessionStorageService;
