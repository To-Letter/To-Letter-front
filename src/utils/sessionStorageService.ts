const sessionStorageService = {
  set: (key: string, value: string = "") => {
    return typeof window !== "undefined"
      ? sessionStorage.setItem(key, value)
      : null;
  },
  get: (key: string = "", type: "accessToken" | "refreshToken") => {
    const data =
      typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    if (data) {
      const storedObject = JSON.parse(data);
      const accessToken = storedObject?.JWTDataState?.accessToken;
      const refreshToken = storedObject?.JWTDataState?.refreshToken;
      if (accessToken && type === "accessToken") {
        return accessToken;
      } else if (refreshToken && type === "refreshToken") {
        return refreshToken;
      }
    }
    return typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
  },
  delete: (key: string = "") => {
    return typeof window !== "undefined"
      ? sessionStorage.removeItem(key)
      : null;
  },
};

export default sessionStorageService;
