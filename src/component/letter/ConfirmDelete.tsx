import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { individualLetterState } from "../../recoil/letterPopupAtom";
import { useSetRecoilState } from "recoil";
import { deleteLetter } from "../../apis/controller/letter";
import { deleteLetterPopupState } from "../../recoil/deleteLetterPopupAtom";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

interface propsI {
  mailIds: number[]
  setIsConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>
  type:"received"| "send"
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>| null
  setDeleteLetter?: React.Dispatch<React.SetStateAction<boolean>>|null
}

const ConfirmDelete = ({mailIds, setIsConfirmPopup, type="received", setSearchTerm=null, setDeleteLetter=null}: propsI) => {
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);
  const setDeleteLetterPopup = useSetRecoilState(deleteLetterPopupState)
  const message = useMemo(() => {
    if(type==="received"){
      return `선택한 편지를 버립니다.`
    }else{
      return `선택한 편지를 보낸 편지함에서 버립니다.\n편지를 받은 사람은 계속 편지를\n열람할 수 있습니다.`
    }
  },[type]);

  const onClickConfirm = async () => {
    try {
      const res = await deleteLetter({letterIds: mailIds, letterType: type})
      if (res.data.responseCode === 200) {
        // 편지 삭제 성공
        alert('편지를 버렸습니다.')
      } else if (res.data.responseCode === 401) {
        // 메일 삭제 실패 / 메일(letterId)이 없음
        alert('편지가 존재하지 않습니다.')
      } else if (res.data.responseCode === 403) {
        // 메일 삭제 실패 / 메일 주인이 아님
        alert('편지의 주인이 아닙니다.')
      }
    } catch (error) {
      console.log("onClickConfirm-deleteLetter error: ", error)
    }
    setIndividualLetterInfo({
      isOpen: false,
      id: -9999,
      toUserNickname: "",
      letterContent: "",
      fromUserNickname: "",
      onDelete: false,
      tab:type
    });
    setIsConfirmPopup(false);
    setDeleteLetterPopup(true);
    if(setSearchTerm !== null){
      setSearchTerm("")
    }
    if(setDeleteLetter!== null){
      setDeleteLetter(prev=>!prev)
    }
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <NicknameAuthWrap>
          <NicknameAuthContent>
            <FormLabel>
              <Box $alignItems="center" $justifyContent="center">
                <Text>
                  {message}
                </Text>
                <Exit onClick={() => setIsConfirmPopup(false)}>X</Exit>
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
`

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

export default ConfirmDelete;
