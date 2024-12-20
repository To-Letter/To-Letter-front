import React, { useMemo } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { deleteLetter } from "@/lib/api/controller/letter";
import { individualLetterState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";

type StatusCode = 200 | 401 | 403;

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

interface propsI {
  mailIds: number[];
  onClose: () => void;
  type: "received" | "send";
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>> | null;
  setDeleteLetter?: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const DeleteConfirmContents = ({
  mailIds,
  onClose,
  type = "received",
  setSearchTerm = null,
  setDeleteLetter = null,
}: propsI) => {
  const router = useRouter();

  /** 편지 삭제 메시지 **/
  const message = useMemo(() => {
    if (type === "received") {
      return `선택한 편지를 버립니다.`;
    } else {
      return `선택한 편지를 보낸 편지함에서 버립니다.\n편지를 받은 사람은 계속 편지를\n열람할 수 있습니다.`;
    }
  }, [type]);

  /** 편지 삭제 api status code **/
  const STATUS_MESSAGES = {
    200: "편지를 버렸습니다.",
    401: "편지가 존재하지 않습니다.",
    403: "편지의 주인이 아닙니다.",
  } as const;

  /* 개별 편지 내용 recoil */
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

  /** 편지 삭제 확인 버튼 클릭 시 실행 함수 **/
  const onClickConfirm = async () => {
    try {
      const res = await deleteLetter({ letterIds: mailIds, letterType: type });
      const statusCode = res.data.responseCode as StatusCode;
      const message = STATUS_MESSAGES[statusCode];

      if (message) {
        alert(message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("편지 삭제 중 오류 발생:", error);
      alert("편지 삭제 중 오류가 발생했습니다.");
    } finally {
      setIndividualLetterInfo({
        id: -9999,
        toUserNickname: "",
        letterContent: "",
        fromUserNickname: "",
        onDelete: false,
        tab: type,
      });

      router.push("/letter/letterdelete");

      if (setSearchTerm !== null) {
        setSearchTerm("");
      }
      if (setDeleteLetter !== null) {
        setDeleteLetter((prev) => !prev);
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <NicknameAuthWrap>
          <NicknameAuthContent>
            <FormLabel>
              <Box $alignItems="center" $justifyContent="center">
                <Text>{message}</Text>
                <Exit onClick={onClose}>X</Exit>
              </Box>
            </FormLabel>
          </NicknameAuthContent>
          <LetterBtn onClick={onClickConfirm}>편지 지우기</LetterBtn>
        </NicknameAuthWrap>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #000000a6;
  border-radius: 2px;
  width: 400px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #0000005c;
`;

export const NicknameSummry = styled.div`
  margin-left: 8px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  color: #e9e9e9;

  &:hover > div {
    display: block;
  }
`;

const Text = styled.div`
  font-size: 16px;
  color: #cecece;
  line-height: 24px;
  text-align: center; /* 텍스트 가운데 정렬 */
  white-space: pre-wrap; /* 줄바꿈을 포함한 공백 처리를 자연스럽게 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
`;

export const TipBox = styled.div`
  display: none;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: break-spaces;
  z-index: 10;
  width: 200px;
  text-align: center;
  word-break: keep-all;
`;

export const Box = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  position: relative;
`;

const NicknameAuthWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

const NicknameAuthContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
`;

const Exit = styled.div`
  position: absolute;
  right: -39px;
  top: -35px;
  padding: 4px 12px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

/* const FormInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  width: 100%;
  height: 28px;
  font-size: 20px;
  margin-top: 8px;
  color: #ffffff;
  &:focus {
    outline: none; 
    box-shadow: none;
  }
  &:-internal-autofill-selected {
    border: none;
    background-color: transparent;
    border-bottom: 1px solid white;
    width: 100%;
    height: 28px;
    font-size: 20px;
    margin-top: 8px;
    color: #ffffff;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 5000s ease-in-out 0s;
    border-bottom: 1px solid white;
  }
`; */

const LetterBtn = styled.div`
  width: 100%;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
  color: #e9e9e9;
  background-color: #262523;
  cursor: pointer;
`;

export default DeleteConfirmContents;
