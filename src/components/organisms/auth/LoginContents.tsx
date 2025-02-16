"use client";

import React, { ChangeEvent, useState } from "react";
import InputForm from "../../molecules/InputForm";
import Button from "../../atoms/Button";
import { Text } from "../../atoms/Text";
import { MainBox, SectionBox } from "../../atoms/Box";
import { useRouter } from "next/navigation";
import { myInfoState, signupState } from "@/store/recoil/accountAtom";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { getKakaoURL, postLocalLogin } from "@/lib/api/controller/account";

interface loginFormI {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    responseCode: number;
    responseData?: string;
  };
}

export default function LoginContents() {
  const router = useRouter();
  /** 로그인 정보 관리 state */
  const [loginForm, setLoginForm] = useState<loginFormI>({
    email: "",
    password: "",
  });
  /** 유저 정보 reocil reset */
  const resetMyInfo = useResetRecoilState(myInfoState);
  /** 회원가입 정보 관리 recoil */
  const setSignupForm = useSetRecoilState(signupState);
  /** 로딩 상태 관리 recoil */
  const setLoadingState = useSetRecoilState(loadingState);

  /** 로그인 정보 입력 업데이트 함수 */
  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /** 로그인 api 통신 및 응답 처리 함수 */
  const onClickLogin = async () => {
    if (loginForm.email === "") {
      alert("이메일을 정확히 입력해주세요.");
    } else if (loginForm.password === "") {
      alert("비밀번호를 입력해주세요.");
    }
    try {
      /** 기존에 저장되어있는 유저 정보 삭제 */
      resetMyInfo();
      const res: LoginResponse = await postLocalLogin({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (res.data.responseCode === 200) {
        /** 로그인 성공 */
        router.push("/");
      } else if (res.data.responseCode === 403) {
        /** 이메일 인증 미완료 계정 */
        setSignupForm((prev) => ({
          ...prev,
          email: loginForm.email,
        }));
        alert("이메일 인증이 되지않은 계정입니다.");
        router.push("/auth/verify");
      } else if (
        res.data.responseCode === 401 ||
        res.data.responseCode === 400
      ) {
        alert("이메일 혹은 비밀번호를 잘못입력하셨습니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: any) {
      alert("이메일 혹은 비밀번호를 잘못입력하셨습니다.");
    }
  };

  /** 카카오 로그인 api 통신 및 응답 처리 함수 */
  const onClickKakaoLogin = async () => {
    //기존에 저장되어있는 유저 정보 삭제
    resetMyInfo();
    setLoadingState(true);
    try {
      const res: LoginResponse = await getKakaoURL();
      if (res.data.responseCode === 200 && res.data.responseData) {
        window.location.href = res.data.responseData;
      }
    } catch (error: any) {
      alert("카카오 로그인 오류입니다. 잠시후에 다시 시도해주세요.");
    }
  };

  return (
    <MainBox $direction="column" $alignItems="flex-start" $width="100%">
      <SectionBox $direction="column" $width="100%" $margin="24px 0">
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          onChange={onChangeFormHdr}
          isExistButton={false}
        />
        <InputForm
          keyValue="inputform-password"
          labelTitle="Password"
          name="password"
          type="password"
          onChange={onChangeFormHdr}
          isExistButton={false}
        />
      </SectionBox>

      <SectionBox $direction="column" $width="100%">
        <Button
          title="Login"
          onClick={onClickLogin}
          $padding="8px 0"
          $margin="0 0 16px 0"
        />
        <Button
          title="카카오톡 로그인"
          onClick={onClickKakaoLogin}
          $padding="8px 0"
        />
      </SectionBox>

      <SectionBox
        $direction="column"
        $alignItems="flex-end"
        $width="100%"
        $margin=" 8px 0 0 0"
      >
        <Text
          $color="#e9e9e9"
          $fontSize="16px"
          $isClickAble={true}
          onClick={() => router.push("/auth/findaccount")}
        >{`can't login?`}</Text>
      </SectionBox>
    </MainBox>
  );
}
