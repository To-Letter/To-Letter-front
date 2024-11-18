import sendApi from "../sendApi";

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

  console.log("계속 요청 보낸다~");

  return response;
};

// 보낸 편지함
export const getSendLetter = async () => {
  const response: any = await sendApi.get(`/letter/sent`);

  return response;
};
