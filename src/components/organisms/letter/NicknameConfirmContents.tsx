"use client";

import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import ToastMessage from "@/components/atoms/ToastMessage";
import { useSetRecoilState, useRecoilState } from "recoil";
import { nicknameAndContentsState } from "@/store/recoil/letterAtom";
import { loadingState } from "@/store/recoil/loadingAtom";
import { getNicknameConfirm } from "@/lib/api/controller/account";
import { useRouter } from "next/navigation";
import { ElementBox, MainBox, SectionBox } from "@/components/atoms/Box";
import SummaryTip from "@/components/molecules/SummaryTip";
import Button from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

const NicknameConfirmContents: React.FC = () => {
  const router = useRouter();
  /* 닉네임 인증의 여부를 체크하는 state */
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  /* 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /* 받는 사람 닉네임과 편지내용을 관리하는 reocil */
  const [nicknameAndContents, setNicknameAndContents] = useRecoilState(
    nicknameAndContentsState
  );
  /* 로딩 상태를 관리하는 reocil */
  const setLoding = useSetRecoilState(loadingState);

  /**
   * 사용자가 닉네임을 입력하면 닉네임 recoil에 상태 업데이트 함수
   */
  const onChangeToUserNicknameHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameAndContents({ nickname: e.target.value, contents: "" });
  };

  /**
   * 닉네임 인증 요청 함수
   */
  const authToUseNickname = async () => {
    setLoding(true);
    try {
      const res: any = await getNicknameConfirm({
        nickname: nicknameAndContents.nickname,
      });
      if (res.data.responseCode === 200) {
        // 보내는 유저 닉네임이 존재X
        setIsNicknameChecked(false);
        setLoding(false);
      } else if (res.data.responseCode === 401) {
        // 보내는 유저 닉네임이 존재O
        setIsNicknameChecked(true);
        setLoding(false);
      }
    } catch (error: any) {
      setToast({
        message: "닉네임 인증 요청 오류입니다. 잠시후에 다시 시도해주세요.",
        visible: true,
      });
    }
  };

  /**
   * 편지 쓰기 모달로 이동 함수
   */
  const moveLetter = () => {
    if (isNicknameChecked) {
      router.push("/letter/letterwrite");
    } else {
      setToast({ message: "닉네임 확인을 완료해주세요.", visible: true });
    }
  };

  return (
    <MainBox
      $direction="column"
      $justifyContent="center"
      $alignItems="flex-start"
      $width="calc(100% - 80px)"
      $margin="12px 40px 20px 40px"
    >
      <SectionBox
        $width="100%"
        $direction="column"
        $alignItems="flex-start"
        $justifyContent="center"
        $margin="16px 0"
      >
        <FormLabel>
          <ElementBox $alignItems="center" $justifyContent="space-between">
            <ElementBox $alignItems="center" $justifyContent="center">
              받는 사람 닉네임
              <SummaryTip
                $margin="0 8px"
                $bottom="24px"
                tipText="편지를 보내는 사람의 닉네임이 존재하는지 확인해주세요."
              />
            </ElementBox>
            <Button
              title="확인 요청"
              $width="80px"
              $padding="2px 0"
              onClick={authToUseNickname}
            />
          </ElementBox>
          <FormInput type="text" onChange={onChangeToUserNicknameHdr} />
          <Text $fontSize="10px" $margin="10px 0 0 0">
            {isNicknameChecked
              ? "존재하는 유저입니다."
              : "존재하지 않는 유저입니다."}
          </Text>
        </FormLabel>
      </SectionBox>
      <SectionBox $width="100%">
        <Button title="편지 쓰기" $padding="6px 0" onClick={moveLetter} />
        {toast.visible && (
          <ToastMessage
            message={toast.message}
            onClose={() => setToast({ ...toast, visible: false })}
          />
        )}
      </SectionBox>
    </MainBox>
  );
};

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
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

export default NicknameConfirmContents;
