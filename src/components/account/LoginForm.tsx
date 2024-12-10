"use client";

import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import ModalBox from "../atoms/ModalBox";
import InputForm from "../molecules/InputForm";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";
import { getKakaoURL, postLocalLogin } from "../../apis/controller/account";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { accountModalState, emailState } from "../../recoil/accountAtom";
import { myInfoState } from "../../recoil/myInfoAtom";
import { loadingState } from "../../recoil/loadingAtom";

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

const LoginForm = () => {
  const setEmail = useSetRecoilState(emailState);
  const setLoadingState = useSetRecoilState(loadingState);
  const setModalState = useSetRecoilState(accountModalState);
  const [loginForm, setLoginForm] = useState<loginFormI>({
    email: "",
    password: "",
  });
  const resetMyInfo = useResetRecoilState(myInfoState);

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickLogin = async () => {
    if (loginForm.email === "") {
      alert("이메일을 정확히 입력해주세요.");
    } else if (loginForm.password === "") {
      alert("비밀번호를 입력해주세요.");
    }
    try {
      //기존에 저장되어있는 유저 정보 삭제
      resetMyInfo();
      const res: LoginResponse = await postLocalLogin({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (res.data.responseCode === 200) {
        // 로그인 성공
        setModalState({
          isOpen: false,
          type: null, // 로그인 타입으로 설정
        });
      } else if (res.data.responseCode === 403) {
        // 이메일 인증 미완료 계정
        setEmail(loginForm.email);
        alert("이메일 인증이 되지않은 계정입니다.");
        setModalState({
          isOpen: true,
          type: "MailVerify",
        });
      } else if (
        res.data.responseCode === 401 ||
        res.data.responseCode === 400
      ) {
        // 걍 틀림
        alert("이메일 혹은 비밀번호를 잘못입력하셨습니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      alert("이메일 혹은 비밀번호를 잘못입력하셨습니다.");
    }
  };

  const onClickKakaoLogin = async () => {
    //기존에 저장되어있는 유저 정보 삭제
    resetMyInfo();
    setLoadingState(true);
    try {
      const res: LoginResponse = await getKakaoURL();
      if (res.data.responseCode === 200 && res.data.responseData) {
        window.location.href = res.data.responseData;
      }
    } catch (err) {
      console.error("kakao Login Error:", err);
      alert("kakao Login code Error");
    }
  };

  return (
    <ModalBox
      isExitBtn={true}
      $direction="column"
      $justifyContent="flex-start"
      $width="430px"
      $height="auto"
      $padding="32px 0"
    >
      <ContentContainer>
        <InputForm
          key="email"
          labelTitle="Email"
          type="text"
          name="email"
          onChange={onChangeFormHdr}
        />
        <InputForm
          key="password"
          labelTitle="Password"
          type="password"
          name="password"
          onChange={onChangeFormHdr}
        />

        <ButtonGroup>
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
            $margin="0 0 16px 0"
          />

          <Text
            $fontSize="14px"
            $color="#e9e9e9"
            $margin="8px 0 0 0"
            $isClickAble={true}
            onClick={() => {
              // 비밀번호 찾기 로직
            }}
          >
            can&apos;t login?
          </Text>
        </ButtonGroup>
      </ContentContainer>
    </ModalBox>
  );
};

export default LoginForm;

// 레이아웃을 위한 최소한의 스타일 컴포넌트만 유지
const ContentContainer = styled.div`
  width: calc(100% - 80px);
  margin: 0 40px;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
