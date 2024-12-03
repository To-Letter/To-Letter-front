import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { postEmailVerify, getEmialAuth } from "../../apis/controller/account";
import ToastMessage from "../ToastMessage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountModalState, emailState } from "../../recoil/accountAtom";
import { emailVerifyAuthType } from "../../constants/emailVerify";
import { loadingState } from "../../recoil/loadingAtom";
import Timer from "./Timer";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

const MailVerify: React.FC = () => {
  const email = useRecoilValue(emailState);
  const setModalState = useSetRecoilState(accountModalState);
  const setLoding = useSetRecoilState(loadingState)
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  const [mailKey, setMailKey] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const [authReqMessage, setAuthReqMessage] = useState<boolean>(false);

  const onChangeMailKeyHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
  };

  // 이메일 인증코드 발송
  const authRequest = async () => {
    setLoding(true);
    try {
      let res: any = await getEmialAuth({ email: email });
      if (res.data.responseCode === 200) {
        setLoding(false);
        setAuthReqMessage(true);
        setVerifyMe(true);
      } else if (res.data.responseCode === 201) {
        setLoding(false);
        setAuthReqMessage(true);
        setVerifyMe(true);
        setToast({ message: "시간 초과로 인증코드를 다시 보냈습니다.", visible: true });
      } else if (res.data.responseCode === 401) {
        setLoding(false);
        setToast({ message: "이미 인증코드를 전송 하였습니다.", visible: true });
      } else if (res.data.responseCode === 403) {
        setLoding(false);
        alert("이미 이메일 인증을 완료했습니다. 로그인을 해주세요!");
        setModalState({
          isOpen: true,
          type: "login",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 이메일 인증 요청
  const submitSignup = async () => {
    if (!verifyMe) {
      setToast({ message: "인증 요청 버튼을 먼저 눌러주세요.", visible: true });
    } else if (mailKey === "" || mailKey.length !== 6) {
      setToast({ message: "인증 키가 제대로 입력되지 않았습니다.", visible: true });
    } else {
      try {
        setLoding(true);
        let res: any = await postEmailVerify({
          email: email,
          randomCode: mailKey,
          authType: emailVerifyAuthType.signup
        });

        if (res.data.responseCode === 200) {
          setLoding(false);
          alert("회원가입 성공!");
          setModalState({
            isOpen: true,
            type: "login",
          });
        } else if (res.data.responseCode === 401) {
          setLoding(false);
          setAuthReqMessage(true);
          setVerifyMe(true);
          setToast({ message: "시간 초과로 인증코드를 다시 보냈습니다.", visible: true });
        } else if (res.data.responseCode === 403) {
          setLoding(false);
          setToast({ message: "인증 코드가 불일치합니다.", visible: true });
        } else if (res.data.responseCode === 404) {
          setLoding(false);
          alert("메일이 존재하지 않습니다. 다른 메일로 시도해주세요.");
          setModalState({
            isOpen: true,
            type: "signup",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  


  return (
    <SignupWrap>
      <SignupContent>
        <FormLabel>
          <Box $alignItems="center" $justifyContent="space-between">
            이메일 인증
            {verifyMe ? (
              <Timer setVerifyMe={setVerifyMe}/>
            ) : (
              <Button onClick={authRequest}>인증 요청</Button>
            )}
          </Box>
          <FormInput type="text" onChange={onChangeMailKeyHdr} />
          <EmialText>
            {authReqMessage && "이메일 인증코드가 발송되었습니다."}
          </EmialText>
        </FormLabel>
      </SignupContent>
      <SignupBtn onClick={submitSignup}>Signup</SignupBtn>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </SignupWrap>
  );
};

export default MailVerify;

export const Box = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  position: relative;
`;

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

const SignupContent = styled.div`
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

const Button = styled.div`
  width: 80px;
  border-radius: 1px;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  color: #e9e9e9;
  background-color: #262523;
  cursor: pointer;
`;



const SignupBtn = styled.div`
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

const EmialText = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;
