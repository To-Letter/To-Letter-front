"use client";

import React, { ChangeEvent, useState } from "react";
import ToastMessage from "@/components/atoms/ToastMessage";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useSetRecoilState } from "recoil";
import { patchPasswordUpdate } from "@/lib/api/controller/account";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { MainBox, SectionBox } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";

export default function PasswordChangeContents() {
  const router = useRouter();
  /** 변경 비밀번호 관리 state */
  const [firstPass, setFirstPass] = useState<string>("");
  /** 변경 비밀번호 확인 관리 state */
  const [secondPass, setSecondPass] = useState<string>("");
  /** 두 비밀번호 동일 여부 관리 state */
  const [checkSamePass, setCheckSamePass] = useState<boolean>(false);
  /** 유저 정보 관리 */
  const { myInfo } = useUser();
  /** 토스트 메시지 관리 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 로딩 상태 관리 recoil */
  const setLoding = useSetRecoilState(loadingState);

  /** 비밀번호 검증 함수 */
  const validatePasswords = (pass1: string, pass2: string) => {
    setCheckSamePass(pass1 === pass2 && pass1.length > 0);
  };

  /** 변경 비밀번호 입력 함수 */
  const onChangeFirstPass = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPass(e.target.value);
    validatePasswords(e.target.value, secondPass);
  };

  /** 변경 비밀번호 확인 입력 함수 */
  const onChangeSecondPass = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPass(e.target.value);
    validatePasswords(firstPass, e.target.value);
  };

  /** 변경 비밀번호 api통신 및 응답 처리 함수 */
  const submitChangePass = async () => {
    if (checkSamePass && firstPass.length !== 0 && secondPass.length !== 0) {
      setLoding(true);
      const res: any = await patchPasswordUpdate({
        changePassword: firstPass,
        email: myInfo.email,
      });
      if (res.data.responseCode === 200) {
        setLoding(false);
        alert("비밀번호 변경 성공!");
        router.push("/auth/login");
      } else if (res.data.responseCode === 400) {
        setLoding(false);
        alert("기존 비밀번호와 동일합니다.");
      } else if (res.data.responseCode === 401) {
        setLoding(false);
        alert("등록된 유저가 아닙니다.");
      } else if (res.data.responseCode === 403) {
        setLoding(false);
        alert("2차 인증이 정상적으로 진행되지 않았습니다.");
      } else if (res.data.responseCode === 404) {
        setLoding(false);
        alert(
          "등록된 이메일로 검증이 진행되지 않았습니다. 이메일 인증을 먼저 진행해주세요."
        );
      } else {
        console.log("res", res);
        setLoding(false);
        alert("등록된 유저가 없습니다.");
      }
    } else {
      setToast({
        message:
          "두 비밀번호가 동일하지 않거나 변경 비밀번호가 입력되지 않았습니다.",
        visible: true,
      });
    }
  };

  return (
    <MainBox
      $width="100%"
      $height="380px"
      $direction="column"
      $alignItems="center"
      $justifyContent="flex-start"
    >
      <SectionBox
        $width="100%"
        $direction="column"
        $alignItems="flex-start"
        $justifyContent="center"
        $margin="24px 0"
      >
        <InputForm
          keyValue={"password"}
          labelTitle="변경 비밀번호"
          type="password"
          name="password"
          onChange={onChangeFirstPass}
        />
        <InputForm
          keyValue={"password"}
          labelTitle="변경 비밀번호 확인"
          type="password"
          name="password"
          onChange={onChangeSecondPass}
        />
        <Text $color="#e9e9e9" $fontSize="10px" $margin="0 0 24px 0">
          {checkSamePass
            ? "비밀번호가 동일합니다."
            : "비밀번호가 동일하지 않습니다."}
        </Text>
        <Button
          title="비밀번호 변경"
          $padding="8px 0"
          onClick={submitChangePass}
        />
        {toast.visible && (
          <ToastMessage
            message={toast.message}
            onClose={() => setToast({ ...toast, visible: false })}
          />
        )}
      </SectionBox>
    </MainBox>
  );
}
