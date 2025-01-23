"use client";

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
import {
  getNicknameConfirm,
  postKakaoSignup,
} from "@/lib/api/controller/account";
import ToastMessage from "@/components/atoms/ToastMessage";

export default function KakaoSignupContents() {
  const router = useRouter();
  /** 주소 팁 텍스트 */
  const tipText = useRef<string>(
    `
    To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소
    값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
    `
  );
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 닉네임 중복 체크 여부 관리 state */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  /** 회원가입 정보 관리 recoil */
  const [signupForm, setSignupForm] = useRecoilState(signupState);

  /** 닉네임 입력 업데이트 함수 */
  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "nickname") setIsNicknameChecked(false);
  };

  /** 주소 입력 모달 열기 함수 */
  const onClickOpenModal = () => {
    setSignupForm((prev) => ({
      ...prev,
      type: "kakao",
    }));
    router.push("/auth/address");
  };

  /** 카카오 회원가입 api 통신 및 응답 처리 함수 */
  const onClickKakaoSignup = async () => {
    const conditions = [
      {
        check: signupForm.nickname !== "",
        message: "닉네임을 입력해주세요.",
      },
      {
        check: signupForm.mailboxAddress !== "",
        message: "우편함 주소를 입력해주세요.",
      },
      {
        check: isNicknameChecked,
        message: "닉네임 중복 체크를 해주세요.",
      },
    ];

    for (const condition of conditions) {
      if (!condition.check) {
        setToast({ message: condition.message, visible: true });
        return;
      }
    }

    try {
      const res: any = await postKakaoSignup({
        address: signupForm.mailboxAddress,
        email: signupForm.email,
        nickname: signupForm.nickname,
      });
      if (res.data.responseCode === 200) {
        alert("회원가입 성공! 로그인해 주세요.");
        router.push("/auth/login");
      } else if (res.data.responseCode === 401) {
        alert(
          "이메일이 유저정보와 일치하지 않습니다. 이메일을 다시 압력해주세요."
        );
        router.push("/auth/kakao");
      } else if (res.data.responseCode === 403) {
        alert("같은 이메일이 회원정보에 존재합니다.");
        router.push("/auth/login");
      }
    } catch (error: any) {
      alert("카카오 회원가입 오류입니다. 잠시후에 다시 시도해주세요.");
      router.push("/");
    }
  };

  /** 닉네임 중복확인 함수 */
  const onClickConfirmNickname = async () => {
    if (signupForm.nickname === "") {
      setToast({ message: "닉네임을 입력해주세요.", visible: true });
    } else {
      try {
        const res: any = await getNicknameConfirm({
          nickname: signupForm.nickname,
        });
        if (res.status === 200) {
          setToast({ message: "사용 가능한 닉네임입니다.", visible: true });
          setIsNicknameChecked(true);
        } else if (res.data.responseCode === 401) {
          setToast({ message: "중복된 닉네임입니다.", visible: true });
          setIsNicknameChecked(false);
        }
      } catch (error: any) {
        setToast({
          message: "닉네임 인증 요청 오류입니다. 잠시후에 다시 시도해주세요.",
          visible: true,
        });
      }
    }
  };

  /** 주소값을 가져오는 로직 */
  useEffect(() => {
    setSignupForm((prev) => ({
      ...prev,
      mailboxAddress: signupForm.mailboxAddress,
    }));
  }, [router, setSignupForm, signupForm.mailboxAddress]);

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
          onClick={onClickConfirmNickname}
          $disable={isNicknameChecked}
        />
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          onChange={onChangeFormHdr}
          value={signupForm.email}
          readonly={true}
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
          onClick={onClickKakaoSignup}
          $padding="8px 0"
          $margin="0 0 16px 0"
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
}

const FormAddressInput = styled(ElementBox)`
  border-bottom: 1px solid white;
  font-size: 16px;
  color: #ffffff;
`;
