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

export default function MyInfoContents() {
  const router = useRouter();
  /** 닉네임 중복 체크 */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  /** 유저 정보 관리 */
  const { myInfo, updateMyInfo } = useUser();
  /** 주소 팁 텍스트 */
  const tipText = useRef<string>(
    `
    To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소
    값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
    `
  );

  /** 유저 정보 업데이트 함수 */
  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    updateMyInfo({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "nickname") setIsNicknameChecked(false);
  };

  /** 주소 입력 모달 열기 함수 */
  const onClickOpenModal = () => {
    router.push("/auth/address");
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
          onClick={() => {
            setIsNicknameChecked(true);
          }}
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
          onClick={() => {}}
          $padding="8px 0"
          $margin="0 0 16px 0"
        />
        <Button title="Logout" onClick={() => {}} $padding="8px 0" />
      </SectionBox>
    </MainBox>
  );
}

const FormAddressInput = styled(ElementBox)`
  border-bottom: 1px solid white;
  font-size: 16px;
  color: #ffffff;
`;
