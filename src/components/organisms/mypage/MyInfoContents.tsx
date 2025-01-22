"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { ElementBox, MainBox, SectionBox } from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import SummaryTip from "@/components/molecules/SummaryTip";
import { Text } from "@/components/atoms/Text";
import { useUser } from "@/hooks/useUser";
import {
  getLogout,
  getNicknameConfirm,
  patchUserInfoUpdate,
} from "@/lib/api/controller/account";
import ToastMessage from "@/components/atoms/ToastMessage";

export default function MyInfoContents() {
  const router = useRouter();
  /** 유저 정보 관리 */
  const { myInfo, updateMyInfo, resetMyInfo, refreshMyInfo } = useUser();
  /** 주소 팁 텍스트 */
  const tipText = useRef<string>(
    `
    To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소
    값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
    `
  );
  /** 닉네임 중복 체크 */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  /** 초기 닉네임 저장 */
  const [originalNickname] = useState(myInfo.nickname);
  /** 토스트 메시지 */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  /** 유저 정보 업데이트 함수 */
  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateMyInfo({
      [name]: value,
    });
    if (e.target.name === "nickname") setIsNicknameChecked(false);
  };

  /** 주소 입력 모달 열기 함수 */
  const onClickOpenModal = () => {
    router.push("/auth/address");
  };

  /** 유저 정보 변경 함수 */
  const onClickUpdata = async () => {
    /** 닉네임 변경 여부 확인 */
    const isNicknameChanged = originalNickname !== myInfo.nickname;
    /** 닉네임이 변경되었는데 중복체크를 하지 않은 경우 */
    if (isNicknameChanged && !isNicknameChecked) {
      setToast({
        message: "닉네임 중복 체크를 진행해주세요.",
        visible: true,
      });
      return;
    }

    try {
      const res = await patchUserInfoUpdate({
        address: myInfo.address,
        nickname: myInfo.nickname,
      });

      if (res.data.responseCode === 200) {
        await refreshMyInfo();
        setToast({
          message: "정상적으로 변경되었습니다.",
          visible: true,
        });
      }
    } catch (error: any) {
      setToast({
        message:
          "유저 정보 업데이트 중 오류가 발생했습니다. 잠시후에 다시 시도해주세요.",
        visible: true,
      });
    }
  };

  /** 로그아웃 함수 */
  const onClickLogout = async () => {
    try {
      const res = await getLogout();
      if (res.data.responseCode === 200) {
        resetMyInfo();
        router.push("/");
      }
    } catch (error: any) {
      alert("로그아웃 오류입니다. 잠시후에 다시 시도해주세요.");
      router.push("/");
    }
  };

  /** 닉네임 중복확인 함수 */
  const onClickConfirmNickname = async () => {
    if (myInfo.nickname === "") {
      setToast({ message: "닉네임을 입력해주세요.", visible: true });
      return;
    }

    try {
      const res: any = await getNicknameConfirm({
        nickname: myInfo.nickname,
      });

      if (res.data.responseCode === 200) {
        setToast({ message: "사용 가능한 닉네임입니다.", visible: true });
        setIsNicknameChecked(true);
      } else if (res.data.responseCode === 401) {
        setToast({ message: "중복된 닉네임입니다.", visible: true });
        setIsNicknameChecked(false);
      }
    } catch (error: any) {
      setToast({
        message: "닉네임 중복 체크 오류입니다. 잠시후에 다시 시도해주세요.",
        visible: true,
      });
    }
  };

  return (
    <MainBox
      $direction="column"
      $alignItems="flex-start"
      $width="100%"
      $height="380px"
    >
      <SectionBox $direction="column" $width="100%" $margin="16px 0">
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          value={myInfo.email}
          onChange={onChangeFormHdr}
          isExistButton={false}
          readonly={true}
        />
        <InputForm
          keyValue="inputform-nickname"
          labelTitle="Nickname"
          name="nickname"
          type="text"
          onChange={onChangeFormHdr}
          isExistButton={true}
          buttonTitle="중복 체크"
          value={myInfo.nickname}
          onClick={onClickConfirmNickname}
          $disable={isNicknameChecked}
        />
        <ElementBox $justifyContent="space-between" $margin="16px 0 0">
          <ElementBox>
            <Text $color="#e9e9e9">MailboxAddress</Text>
            <SummaryTip
              key="addressTip"
              tipText={tipText.current}
              $margin="0 0 0 4px"
              $bottom="-140px"
            />
          </ElementBox>
          <Button
            $width="80px"
            $padding="2px 0"
            title="주소 입력"
            onClick={onClickOpenModal}
          />
        </ElementBox>
        {myInfo.address && (
          <FormAddressInput
            $width="100%"
            $padding="8px 0"
            $margin="8px 0 0 0"
            $border="none"
            $backgroundColor="transparent"
          >
            {myInfo.address}
          </FormAddressInput>
        )}
      </SectionBox>

      <SectionBox $direction="column" $width="100%">
        <Button
          title="내 정보 수정하기"
          onClick={onClickUpdata}
          $padding="8px 0"
          $margin="0 0 16px 0"
        />
        <Button title="Logout" onClick={onClickLogout} $padding="8px 0" />
      </SectionBox>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </MainBox>
  );
}

const FormAddressInput = styled(ElementBox)`
  border-bottom: 1px solid white;
  font-size: 16px;
  color: #ffffff;
`;
