import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import ToastMessage from "../ToastMessage";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  toUserNicknameState,
  toUserNicknameModalState,
} from "../../recoil/toUserNicknameAtom";
import { loadingState } from "../../recoil/loadingAtom";
import { letterPopupState } from "../../recoil/letterPopupAtom";
import { getNicknameConfirm } from "../../apis/controller/account";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

const ToUserModal: React.FC = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [toUserNickname, setToUserNickname] =
    useRecoilState(toUserNicknameState);
  const setLoding = useSetRecoilState(loadingState);
  const setLetterPopupModal = useSetRecoilState(letterPopupState);
  const setToUserNicknameModal = useSetRecoilState(toUserNicknameModalState);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const onChangeToUserNicknameHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setToUserNickname(e.target.value);
  };

  const authToUseNickname = async () => {
    setLoding(true);
    try {
      let res: any = await getNicknameConfirm({ nickname: toUserNickname });
      if (res.data.responseCode === 200) {
        // 보내는 유저 닉네임이 존재X
        setIsNicknameChecked(false);
        setLoding(false);
      } else if (res.data.responseCode === 401) {
        // 보내는 유저 닉네임이 존재O
        setIsNicknameChecked(true);
        setLoding(false);
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "서버 에러", visible: true });
    }
  };

  const moveLetter = () => {
    if (isNicknameChecked) {
      setToUserNicknameModal(false);
      setLetterPopupModal(true);
    } else {
      setToast({ message: "닉네임 확인을 완료해주세요.", visible: true });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <NicknameAuthWrap>
          <NicknameAuthContent>
            <FormLabel>
              <Box $alignItems="center" $justifyContent="space-between">
                <Box $alignItems="center" $justifyContent="center">
                  받는 사람 닉네임
                  <NicknameSummry>
                    ?
                    <TipBox>
                      편지를 보내는 사람의 닉네임이 존재하는지 확인해주세요.
                    </TipBox>
                  </NicknameSummry>
                </Box>
                <Button onClick={authToUseNickname}>확인 요청</Button>
                <Exit onClick={() => setToUserNicknameModal(false)}>X</Exit>
              </Box>
              <FormInput type="text" onChange={onChangeToUserNicknameHdr} />
              <InstructionText>
                {isNicknameChecked
                  ? "존재하는 유저입니다."
                  : "존재하지 않는 유저입니다."}
              </InstructionText>
            </FormLabel>
          </NicknameAuthContent>
          <LetterBtn onClick={moveLetter}>편지 쓰기</LetterBtn>
          {toast.visible && (
            <ToastMessage
              message={toast.message}
              onClose={() => setToast({ ...toast, visible: false })}
            />
          )}
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

const FormInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  width: 100%;
  height: 28px;
  font-size: 20px;
  margin-top: 8px;
  color: #ffffff;
  &:focus {
    outline: none; /* 기본 outline 제거 */
    box-shadow: none; /* 기본 box-shadow 제거 */
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
`;

const Button = styled.div`
  width: 80px;
  border-radius: 1px;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  color: #e9e9e9;
  background-color: #262523;
  cursor: pointer;
`;

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

const InstructionText = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;

export default ToUserModal;
