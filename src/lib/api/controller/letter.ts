import sendApi from "@/lib/api/sendApi";

/**
 * 편지 보내기
 * @param contents 편지 내용
 * @param saveLetterCheck 편지 저장 여부
 * @param toUserNickname 받는 사람 닉네임
 * @returns response
 */
export const sendLetter = async (sendLetterData: {
  contents: string;
  saveLetterCheck: boolean;
  toUserNickname: string;
}) => {
  const response: any = await sendApi.post(`/letter/send`, {
    contents: sendLetterData.contents,
    saveLetterCheck: sendLetterData.saveLetterCheck,
    toUserNickname: sendLetterData.toUserNickname,
  });

  return response;
};

/**
 * 받은 편지함 요청
 * @param page 현재 페이지
 * @param size 페이지 사이즈
 * @param sort 정렬 기준
 * @returns response
 */
export const getReceiveLetter = async (pageData: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryString = `?page=${pageData.page}&size=${pageData.size}&sort=${pageData.sort}`;
  const response: any = await sendApi.get(`/letter/receive${queryString}`);

  return response;
};

/**
 * 안 읽은 편지함 요청
 * @param page 현재 페이지
 * @param size 페이지 사이즈
 * @param sort 정렬 기준
 * @returns response
 */
export const getUnReadLetter = async (pageData: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryString = `?page=${pageData.page}&size=${pageData.size}&sort=${pageData.sort}`;
  const response: any = await sendApi.get(
    `/letter/receive/unRead${queryString}`
  );

  return response;
};

/**
 * 보낸 편지함 요청
 * @param page 현재 페이지
 * @param size 페이지 사이즈
 * @param sort 정렬 기준
 * @returns response
 */
export const getSendLetter = async (pageData: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryString = `?page=${pageData.page}&size=${pageData.size}&sort=${pageData.sort}`;
  const response: any = await sendApi.get(`/letter/send${queryString}`);

  return response;
};

/**
 * 편지 삭제 요청
 * @param letterIds 삭제 편지 id 배열
 * @param letterType 편지 타입
 * @returns response
 */
export const deleteLetter = async (req: {
  letterIds: number[];
  letterType: "received" | "send";
}) => {
  const response: any = await sendApi.delete(`/letter/deleteLetter`, {
    letterIds: req.letterIds,
    letterType: req.letterType === "received" ? "receivedLetter" : "sentLetter",
  });
  return response;
};

/**
 * 받은 편지함 편지 읽음 처리 요청
 * @param letterID 편지 id
 * @returns response
 */
export const getLetterReading = async (letterID: number) => {
  const queryString = `?letterID=${letterID}`;
  const response: any = await sendApi.get(
    `/letter/receive/viewCheckLetter${queryString}`
  );

  return response;
};
