import sendApi from "@/lib/api/sendApi";

// 편지 보내기
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

// 받은 편지함
export const getReceiveLetter = async (pageData: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryString = `?page=${pageData.page}&size=${pageData.size}&sort=${pageData.sort}`;
  const response: any = await sendApi.get(`/letter/receive${queryString}`);

  return response;
};

// 보낸 편지함
export const getSendLetter = async (pageData: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryString = `?page=${pageData.page}&size=${pageData.size}&sort=${pageData.sort}`;
  const response: any = await sendApi.get(`/letter/sent${queryString}`);

  return response;
};

// 편지 삭제
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

// 받은 편지함 편지 읽음 처리
export const getLetterReading = async (letterID: number) => {
  const queryString = `?letterID=${letterID}`;
  const response: any = await sendApi.get(
    `/letter/receive/viewCheckLetter${queryString}`
  );

  return response;
};
