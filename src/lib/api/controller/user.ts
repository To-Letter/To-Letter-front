import { sendApi } from "../../sendApi";

export const getMypage = async () => {
  const response: any = await sendApi.get(`/users/mypage`);

  return response;
};
