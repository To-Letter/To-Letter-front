import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { getKakaoURL, postLocalLogin } from "../../apis/controller/account";
import { useRecoilState } from "recoil";
import { accountModalState, emailState } from "../../recoil/accountAtom";

interface loginFormI {
  email: string;
  password: string;
}

const Login = () => {
  const [_email, setEmail] = useRecoilState(emailState);
  const [_modalState, setModalState] = useRecoilState(accountModalState);
  const [loginForm, setLoginForm] = useState<loginFormI>({
    email: "",
    password: "",
  });

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
      let res: any = await postLocalLogin({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (res.data.responseCode === 200) {
        // 로그인 성공
        console.log("login success");
        setModalState({
          isOpen: false,
          type: null, // 로그인 타입으로 설정
        })
      }else if(res.data.responseCode === 403) {
        // 이메일 인증 미완료 계정
        setEmail(loginForm.email);
        alert("이메일 인증이 되지않은 계정입니다.");
        setModalState({
          isOpen: true,
          type: "MailVerify",
        })
      }else if(res.data.responseCode === 400) {
        // 걍 틀림
        alert("이메일 혹은 비밀번호를 잘 못 입력하셨습니다.");
      }
      console.log("login res : ", res);
    } catch (error) {
      alert("이메일 혹은 비밀번호를 잘 못 입력하셨습니다.");
    }
  };

  const onClickKakaoLogin = async () => {
    try {
      let res: any = await getKakaoURL();
      console.log("카카오 res :", res);
      if (res.data.responseCode === 200) {
        window.location.href = res.data.responseData;
      }
    } catch (err: any) {
      console.error("kakao Login Error:", err);
      if (err.response.status === 401) {
        console.log("왜 그러는건데");
      }
      alert("kakao Login code Error");
    }
  };

  return (
    <LoginWrap>
      <LoginContent>
        <FormLabel>
          Email
          <FormInput type="text" name="email" onChange={onChangeFormHdr} />
        </FormLabel>
        <FormLabel>
          Password
          <FormInput
            type="password"
            name="password"
            onChange={onChangeFormHdr}
          />
        </FormLabel>
      </LoginContent>
      <LoginBtn onClick={onClickLogin}>Login</LoginBtn>
      <SocialLoginWrap>
        <LoginBtn onClick={onClickKakaoLogin}>카카오톡 로그인</LoginBtn>
        {/* <SocialLoginBtn>google 로그인</SocialLoginBtn> */}
      </SocialLoginWrap>
      <FindAccountTextWrap>can't login?</FindAccountTextWrap>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`;

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

const LoginBtn = styled.div`
  width: 100%;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
  color: #e9e9e9;
  background-color: #262523;

  cursor: pointer;
`;

const SocialLoginWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FindAccountTextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #e9e9e9;
  cursor: pointer;
`;

// const SocialLoginBtn = styled(LoginBtn)`
//   width: 48%;
//   color: #e9e9e9;
// `
