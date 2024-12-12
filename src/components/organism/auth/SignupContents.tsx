import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ElementBox, MainBox, SectionBox } from "../../atoms/Box";
import InputForm from "../../molecules/InputForm";
import { Text } from "../../atoms/Text";
import SummaryTip from "../../molecules/SummaryTip";
import Button from "../../atoms/Button";
import { useRecoilState } from "recoil";
import { signupState } from "@/store/recoil/accountAtom";
import styled from "styled-components";

export default function SignupContents() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useRecoilState(signupState);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const tipText = useRef<string>(
    `
    To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소
    값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
    `
  );

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "nickname") setIsNicknameChecked(false);
    else if (e.target.name === "email") setIsEmailChecked(false);
    console.log(signupForm);
  };

  const onClickOpenModal = () => {
    router.push("/auth/signup/address");
  };

  useEffect(() => {
    console.log("확인", signupForm);
  }, [
    signupForm.nickname,
    signupForm.email,
    signupForm.password,
    signupForm.mailboxAddress,
    isNicknameChecked,
    isEmailChecked,
  ]);

  return (
    <MainBox $direction="column" $alignItems="flex-start" $width="100%">
      <SectionBox $direction="column" $width="100%" $margin="24px 0">
        <InputForm
          keyValue="inputform-nickname"
          labelTitle="Nickname"
          name="nickname"
          type="text"
          onChange={onChangeFormHdr}
          value={signupForm.nickname}
          isExistButton={true}
          buttonTitle="중복 체크"
          onClick={() => {
            setIsNicknameChecked(true);
          }}
          $disable={isNicknameChecked}
        />
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          onChange={onChangeFormHdr}
          value={signupForm.email}
          isExistButton={true}
          buttonTitle="중복 체크"
          onClick={() => {
            setIsEmailChecked(true);
          }}
          $disable={isEmailChecked}
        />
        <InputForm
          keyValue="inputform-password"
          labelTitle="Password"
          name="password"
          type="password"
          onChange={onChangeFormHdr}
          value={signupForm.password}
          isExistButton={false}
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
        {signupForm.mailboxAddress && (
          <FormAddressInput
            $width="100%"
            $padding="8px 0"
            $margin="8px 0 0 0"
            $border="none"
            $backgroundColor="transparent"
          >
            {signupForm.mailboxAddress}
          </FormAddressInput>
        )}
      </SectionBox>
      <SectionBox $direction="column" $width="100%">
        <Button
          title="Signup"
          onClick={() => {}}
          $padding="8px 0"
          $margin="0 0 16px 0"
        />
      </SectionBox>
    </MainBox>
  );
}

const FormAddressInput = styled(ElementBox)`
  border-bottom: 1px solid white;
  font-size: 16px;
  color: #ffffff;
`;
