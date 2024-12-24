import sendApi from "@/lib/api/sendApi";

/**
 * 마이페이지 정보 불러오기
 * @returns response
 */
export const getMypage = async () => {
  const response: any = await sendApi.get(`/users/mypage`);

  return response;
};
