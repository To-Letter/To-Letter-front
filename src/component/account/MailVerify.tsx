import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { postEmailVerify, getEmialAuth } from "../../apis/controller/account";
import ToastMessage from "../ToastMessage";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}
interface MailVerifyProps {
  email: string;
  setMenuNumber: React.Dispatch<React.SetStateAction<number>>;
}

const MailVerify: React.FC<MailVerifyProps> = ({ setMenuNumber, email }) => {
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  const [mailKey, setMailKey] = useState<string>("");
  const [timer, setTimer] = useState<number>(300); // 10분 = 600초
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
    let res: any = await getEmialAuth({ email: email });
    if (res.status === 200) {
      // setToast({ message: "이메일 인증코드가 발송되었습니다.", visible: true });
      setAuthReqMessage(true);
      setVerifyMe(true);
      console.log("이메일 인증코드 발송 성공");
    } else {
      console.log("email auth error : ", res);
    }
  };

  // 이메일 인증 요청
  const submitSignup = async () => {
    if (!verifyMe) {
      setToast({ message: "인증 요청 버튼을 먼저 눌러주세요.", visible: true });
    } else if (mailKey === "" || mailKey.length !== 6) {
      setToast({
        message: "인증 키가 제대로 입력되지 않았습니다.",
        visible: true,
      });
    } else {
      try {
        let res: any = await postEmailVerify({
          email: email,
          randomCode: mailKey,
        });
        if (res.status === 200) {
          setToast({ message: "회원가입 성공!", visible: true });
          setTimeout(() => {
            setMenuNumber(1);
          }, 1000);
        } else if (res.status === 401) {
          setToast({ message: "이메일 인증 시간 초과입니다.", visible: true });
        } else if (res.status === 403) {
          setToast({ message: "코드가 불일치합니다.", visible: true });
        }
        console.log("emailVerify중복 결과 : ", res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verifyMe && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setVerifyMe(false);
      setTimer(300); // 타이머 초기화
    }
    return () => clearInterval(interval);
  }, [verifyMe, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SignupWrap>
      <SignupContent>
        <FormLabel>
          <Box $alignItems="center" $justifyContent="space-between">
            이메일 인증
            {verifyMe ? (
              <Timer>{formatTime(timer)}</Timer>
            ) : (
              <Button onClick={authRequest}>인증 요청</Button>
            )}
          </Box>
          <FormInput type="text" onChange={onChangeMailKeyHdr} />
          {authReqMessage && "이메일 인증코드가 발송되었습니다."}
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

const Timer = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e9e9e9;
  background-color: #262523;
  border: 1px solid #e9e9e9;
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
