import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import ToastMessage from '../ToastMessage';
import { loadingState } from '../../recoil/loadingAtom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {patchPasswordUpdate } from '../../apis/controller/account';
import { useUser } from '../../hook/useUser';
import { myPageModalState } from '../../recoil/myInfoAtom';
import { accountModalState } from '../../recoil/accountAtom';
import { useNavigate } from 'react-router-dom';

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

interface props {
  setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChangePassword() {
  const setLoding = useSetRecoilState(loadingState)
  const [firstPass, setFirstPass] = useState<string>("");
  const [secondPass, setSecondPass] = useState<string>("");
  const [checkSamePass, setCheckSamePass] = useState<boolean>(false);
  const offMypage = useResetRecoilState(myPageModalState); 
  const {myInfo} = useUser();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const setAccountModal = useSetRecoilState(accountModalState)
  const navigate = useNavigate();

  const onChangeFistPass = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPass(e.target.value);
    if(secondPass === e.target.value){
      setCheckSamePass(true);
    }else{
      setCheckSamePass(false);
    }
  };

  const onChangeSecondPass = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPass(e.target.value);
    if(firstPass === e.target.value){
      setCheckSamePass(true);
    }else{
      setCheckSamePass(false);
    }
  };

  const submitChangePass = async () => {
    if(checkSamePass && firstPass.length!==0 && secondPass.length !==0){
      setLoding(true);
      const res:any = await patchPasswordUpdate({
        changePassword: firstPass,
        email: myInfo.email
      })
      if (res.data.responseCode === 200) {
        setLoding(false);
        alert('비밀번호 변경 성공!');
        offMypage();
        setAccountModal({
          isOpen:true,
          type:"login"
        })
        navigate('/');
      } else if(res.data.responseCode === 400) {
        setLoding(false);
        alert('기존 비밀번호와 동일합니다.');
      }  else if(res.data.responseCode === 401) {
        setLoding(false);
        alert('등록된 유저가 아닙니다.');
      } else if(res.data.responseCode === 403) {
        setLoding(false);
        alert('2차 인증이 정상적으로 진행되지 않았습니다.');
      } else if(res.data.responseCode === 404) {
        setLoding(false);
        alert('등록된 이메일로 검증이 진행되지 않았습니다. 이메일 인증을 먼저 진행해주세요.');
      }else {
        console.log("res", res)
        setLoding(false);
        alert('등록된 유저가 없습니다.');
      }
    }else{
      setToast({ message: "두 비밀번호가 동일하지 않거나 변경 비밀번호가 입력되지 않았습니다.", visible: true });
    }
    
  }

  return (
    <>
      <Content>
        <FormLabel>
          변경 비밀번호
          <FormInput type="password" onChange={onChangeFistPass} />
        </FormLabel>
        <FormLabel>
          변경 비밀번호 확인
          <FormInput type="password" onChange={onChangeSecondPass} />
          <EmialText>
            {checkSamePass ? "비밀번호가 동일합니다.":"비밀번호가 동일하지 않습니다."}
          </EmialText>
        </FormLabel>
      </Content>
      <ChangeBtn onClick={submitChangePass}>비밀번호 변경</ChangeBtn>
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