import sendApi from "../sendApi";
import sessionStorageService from "../../utils/sessionStorageService";

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

export const getLetter = async () => {
  const response: any = await sendApi.get(`/letter/receive`);

  return response;
};
