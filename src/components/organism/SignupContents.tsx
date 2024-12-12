import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ElementBox, MainBox, SectionBox } from "../atoms/Box";
import InputForm from "../molecules/InputForm";
import { Text } from "../atoms/Text";
import SummaryTip from "../molecules/SummaryTip";
import Button from "../atoms/Button";

interface loginFormI {
  nickname: string;
  email: string;
  password: string;
  mailboxAddress: string;
}

export default function SignupContents() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState<loginFormI>({
    nickname: "",
    email: "",
    password: "",
    mailboxAddress: "",
  });
  //   const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  //   const [isEmailChecked, setIsEmailChecked] = useState(false);
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
  };

  const onClickOpenModal = () => {
    router.push("/auth/signup/address");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedAddress = searchParams.get("selected_address");
    if (encodedAddress) {
      const address = atob(encodedAddress);
      setSignupForm((prev) => ({
        ...prev,
        mailboxAddress: address,
      }));
      router.replace("/auth/signup");
    }
  }, [router]);

  return (
    <MainBox $direction="column" $alignItems="flex-start" $width="100%">
      <SectionBox $direction="column" $width="100%" $margin="24px 0">
        <InputForm
          keyValue="inputform-nickname"
          labelTitle="Nickname"
          name="nickname"
          type="text"
          onChange={onChangeFormHdr}
          isExistButton={true}
          buttonTitle="중복 체크"
          onClick={() => {}}
        />
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          onChange={onChangeFormHdr}
          isExistButton={true}
          buttonTitle="중복 체크"
          onClick={() => {}}
        />
        <InputForm
          keyValue="inputform-password"
          labelTitle="Password"
          name="password"
          type="password"
          onChange={onChangeFormHdr}
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
