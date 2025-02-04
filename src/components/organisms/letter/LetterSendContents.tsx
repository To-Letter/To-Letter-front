"use client";

import React, { useState } from "react";
import styled from "styled-components";
import ToastMessage from "@/components/atoms/ToastMessage";
import { useSetRecoilState, useRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import { sendLetter } from "@/lib/api/controller/letter";
import { nicknameAndContentsState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";
import { ElementBox, MainBox, SectionBox } from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import SummaryTip from "@/components/molecules/SummaryTip";

const LetterSendContents: React.FC = () => {
  const router = useRouter();
  /* 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /* 보낸 편지함에 저장 여부를 관리하는 state */
  const [checked, setChecked] = useState(false);
  /* 로딩 상태를 관리하는 reocil */
  const setLoding = useSetRecoilState(loadingState);
  /* 받는 사람 닉네임과 편지내용을 관리하는 reocil */
  const [nicknameAndContents, setNicknameAndContents] = useRecoilState(
    nicknameAndContentsState
  );

  /** 보낸 편지함에 저장 여부를 관리하는 함수 */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  /** 편지 보내기 함수 */
  const letterSend = async () => {
    setLoding(true);
    try {
      const res: any = await sendLetter({
        contents: nicknameAndContents.contents,
        saveLetterCheck: checked,
        toUserNickname: nicknameAndContents.nickname,
      });
      if (res.data.responseCode === 200) {
        router.push("/");
        setNicknameAndContents({ nickname: "", contents: "" }); // 닉네임, 내용 초기화
        setLoding(false);
        alert("편지 보내기를 완료하였습니다!");
      } else if (res.data.responseCode === 403) {
        router.push("/letter/userconfirm");
        setLoding(false);
        alert("존재하지 않는 유저입니다. 다시 닉네임을 확인해주세요.");
      }
    } catch (error: any) {
      alert("편지 보내기 오류입니다. 잠시후에 다시 시도해주세요.");
    }
  };

  return (
    <MainBox
      $width="calc(100% - 80px)"
      $direction="column"
      $alignItems="flex-start"
      $justifyContent="center"
      $margin="12px 40px 12px 40px"
    >
      <SectionBox
        $width="100%"
        $direction="column"
        $alignItems="flex-start"
        $justifyContent="center"
        $margin="16px 0"
      >
        <ContentLabel>
          <ElementBox
            $direction="column"
            $justifyContent="center"
            $alignItems="center"
          >
            <ElementBox $alignItems="center" $justifyContent="center">
              편지를 이대로 보내시겠습니까
              <SummaryTip
                $margin="0 0 0 4px"
                $left="-50px"
                tipText="※ To. Letter의 편지는 유저들이 등록한 주소 거리에 기반하여 우편 도착시간이 결정됩니다."
              />
            </ElementBox>
            <CheckboxLabel>
              보낸 편지함에 저장
              <SendLetterCheckbox
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              />
            </CheckboxLabel>
          </ElementBox>
        </ContentLabel>
      </SectionBox>
      <SectionBox
        $width="calc(100% - 80px)"
        $direction="row"
        $alignItems="space-between"
        $justifyContent="space-between"
        $margin="0 40px 16px 40px"
      >
        <Button title="예" onClick={letterSend} $width="30%" $padding="8px 0" />
        <Button
          title="아니요"
          onClick={() => router.push("/")}
          $width="30%"
          $padding="8px 0"
        />
      </SectionBox>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </MainBox>
  );
};

const ContentLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
`;
const SendLetterCheckbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

export default LetterSendContents;
