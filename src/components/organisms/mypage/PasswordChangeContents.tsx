import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import ToastMessage from "@/components/atoms/ToastMessage";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useSetRecoilState } from "recoil";
import { patchPasswordUpdate } from "@/lib/api/controller/account";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

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

  // 비밀번호 검증 함수
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
    <ChangePasswordWrap>
      <Content>
        <FormLabel>
          변경 비밀번호
          <FormInput type="password" onChange={onChangeFirstPass} />
        </FormLabel>
        <FormLabel>
          변경 비밀번호 확인
          <FormInput type="password" onChange={onChangeSecondPass} />
          <EmialText>
            {checkSamePass
              ? "비밀번호가 동일합니다."
              : "비밀번호가 동일하지 않습니다."}
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
    </ChangePasswordWrap>
  );
}

const ChangePasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 380px;
  align-items: center;
  justify-content: start;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

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
