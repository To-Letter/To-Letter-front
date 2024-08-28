// Modal.tsx
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

interface loginFormI {
  email: string
  password: string
}
const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<loginFormI>({
    email: "",
    password: ""
  })

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>)=>{
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onClickLogin = () => {
    if(loginForm.email === ''){
      alert('이메일을 정확히 입력해주세요.')
    }else if(loginForm.password === ''){
      alert('비밀번호를 입력해주세요.')
    }
    console.log("login data: ", loginForm);
  }

  return (
    <LoginWrap>
      <LoginContent>
          <FormLabel >
            Email
            <FormInput type='text' name="email" onChange={onChangeFormHdr} />
          </FormLabel>
          <FormLabel>
            Password
            <FormInput type='password' name="password" onChange={onChangeFormHdr} />
          </FormLabel>
      </LoginContent>
      <LoginBtn onClick={onClickLogin}>Login</LoginBtn>
      <SocialLoginWrap>
      <LoginBtn>카카오톡 로그인</LoginBtn>
      {/* <SocialLoginBtn>google 로그인</SocialLoginBtn> */}
      </SocialLoginWrap>
      <FindAccountTextWrap>
        can't login?
      </FindAccountTextWrap>
      
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);;
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
`
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
`

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
`

const SocialLoginWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FindAccountTextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #e9e9e9;
`

// const SocialLoginBtn = styled(LoginBtn)`
//   width: 48%;
//   color: #e9e9e9;
// `