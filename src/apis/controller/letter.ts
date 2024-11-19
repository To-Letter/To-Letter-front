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
export const getReceiveLetter = async () => {
  const response: any = await sendApi.get(`/letter/receive`);

  return response;
};

// 보낸 편지함
export const getSendLetter = async () => {
  const response: any = await sendApi.get(`/letter/sent`);

  return response;
};


// 편지 삭제
export const deleteLetter = async (req: {
  letterIds: number[] 
  letterType: "received"|"send"
}) => {
  const response: any = await sendApi.delete(`/letter/deleteLetter`, {
    letterIds: req.letterIds,
    letterType: req.letterType ==="received"? "receivedLetter":"sentLetter"
  })
  return response;
}