import { SESSION_ACCESSTOKEN_KEY, SESSION_REFRESHTOKEN_KEY } from "../constants/session";

const sessionStorageService = {
  set: (type: "accessToken" | "refreshToken", value: string = "") => {
    if(typeof window !== "undefined"){
      if(type === "accessToken"){
        return sessionStorage.setItem(SESSION_ACCESSTOKEN_KEY, value)
      }else if( type === "refreshToken"){
        return sessionStorage.setItem(SESSION_REFRESHTOKEN_KEY, value)
      }
    }
  },
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
  delete: () => {
    return typeof window !== "undefined"
      ? (sessionStorage.removeItem(SESSION_ACCESSTOKEN_KEY)
         ,sessionStorage.removeItem(SESSION_REFRESHTOKEN_KEY))
      : null;
  },
};

export default sessionStorageService;
