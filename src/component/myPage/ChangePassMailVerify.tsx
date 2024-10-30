import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import Timer from '../account/Timer';
import ToastMessage from '../ToastMessage';
import { loadingState } from '../../recoil/loadingAtom';
import { useSetRecoilState } from 'recoil';
import { getFindMailAuth, postEmailVerify } from '../../apis/controller/account';
import { useUser } from '../../hook/useUser';
import { emailVerifyAuthType } from '../../constants/emailVerify';

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

interface props {
  setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChangePassMailVerify({setCheck}: props) {
  const setLoding = useSetRecoilState(loadingState)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const [mailKey, setMailKey] = useState<string>("");
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  const {myInfo} = useUser();

  const onChangeMailKeyHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
  };

  const onClickMailVerify = async () => {
    if (!verifyMe) {
      setToast({ message: "인증 요청 버튼을 먼저 눌러주세요.", visible: true });
    } else if (mailKey === "" || mailKey.length !== 6) {
      setToast({ message: "인증 키가 제대로 입력되지 않았습니다.", visible: true });
    } else {
      try {
        setLoding(true);
        let res: any = await postEmailVerify({
          email: myInfo.email,
          randomCode: mailKey,
          authType: emailVerifyAuthType.updatePass
        });

        if (res.data.responseCode === 201) {
          setLoding(false);
          setCheck(true);
          setToast({ message: "이메일 확인 성공!", visible: true });
        } else if (res.data.responseCode === 401) {
          setLoding(false);
          setVerifyMe(true);
          setToast({ message: "시간 초과로 인증에 실패했습니다.", visible: true });
        } else if (res.data.responseCode === 403) {
          setLoding(false);
          setToast({ message: "인증 코드가 불일치합니다.", visible: true });
        } else if (res.data.responseCode === 404) {
          setLoding(false);
          setToast({ message: "메일이 존재하지 않습니다. 다른 메일로 시도해주세요.", visible: true });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  
   // 이메일 인증코드 발송
   const authRequest = async () => {
    setLoding(true);
    try {
      let res: any = await getFindMailAuth(myInfo.email);
      if (res.data.responseCode === 200) {
        setLoding(false);
        setVerifyMe(true);
        setToast({ message: "인증 코드를 전송하였습니다.", visible: true });
      } else if (res.data.responseCode === 201) {
        setLoding(false);
        setVerifyMe(true);
        setToast({ message: "시간 초과로 인증코드를 다시 보냈습니다.", visible: true });
      } else if (res.data.responseCode === 401) {
        setLoding(false);
        setToast({ message: "등록된 이메일이 없습니다. 다시 시도해주세요.", visible: true });
      } else if (res.data.responseCode === 403) {
        setLoding(false);
        setVerifyMe(true);
        setToast({ message: "이미 메일이 전송되었습니다. 메일함을 확인해주세요.", visible: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Content>
        <FormLabel>
          <Box $alignItems="center" $justifyContent="space-between">
            비밀번호 변경을 위한 이메일 인증
            {verifyMe ? (
              <Timer setVerifyMe={setVerifyMe}/>
            ) : (
              <Button onClick={authRequest}>인증 요청</Button>
            )}
          </Box>
          <FormInput type="text" onChange={onChangeMailKeyHdr} />
          <EmialText>
            {verifyMe && "이메일 인증코드가 발송되었습니다."}
          </EmialText>
        </FormLabel>
      </Content>
      <ChangeBtn onClick={onClickMailVerify}>인증 코드 확인</ChangeBtn>
        {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </>
  )
}

export const Box = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  position: relative;
`;

export const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
`;

export const FormInput = styled.input`
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

export const Button = styled.div`
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



export const ChangeBtn = styled.div`
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

export const EmialText = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;