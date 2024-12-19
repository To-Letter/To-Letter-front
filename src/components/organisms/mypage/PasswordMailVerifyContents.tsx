import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Timer from "../../account/Timer";
import ToastMessage from "@/components/atoms/ToastMessage";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useSetRecoilState } from "recoil";
import { getFindMailAuth, postEmailVerify } from "@/lib/api/controller/account";
import { useUser } from "@/hooks/useUser";
import { emailVerifyAuthType } from "@/constants/emailVerify";
import { useRouter } from "next/navigation";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

export default function PasswordMailVerifyContents() {
  const router = useRouter();
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 인증 번호 관리 state */
  const [mailKey, setMailKey] = useState<string>("");
  /** 이메일 인증 여부 */
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  /** 유저 정보 관리 */
  const { myInfo } = useUser();
  /** 로딩 상태를 관리하는 recoil */
  const setLoding = useSetRecoilState(loadingState);

  /** 인증 번호 입력 업데이트 함수 */
  const onChangeMailKeyHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
  };

  /** 인증 코드 확인 함수 */
  const onClickMailVerify = async () => {
    if (!verifyMe) {
      setToast({ message: "인증 요청 버튼을 먼저 눌러주세요.", visible: true });
    } else if (mailKey === "" || mailKey.length !== 6) {
      setToast({
        message: "인증 키가 제대로 입력되지 않았습니다.",
        visible: true,
      });
    } else {
      try {
        setLoding(true);
        const res: any = await postEmailVerify({
          email: myInfo.email,
          randomCode: mailKey,
          authType: emailVerifyAuthType.updatePass,
        });

        if (res.data.responseCode === 201) {
          setLoding(false);
          router.push("/mypage/passwordchange");
          setToast({ message: "이메일 확인 성공!", visible: true });
        } else if (res.data.responseCode === 401) {
          setLoding(false);
          setVerifyMe(true);
          setToast({
            message: "시간 초과로 인증코드를 다시 보냈습니다.",
            visible: true,
          });
        } else if (res.data.responseCode === 403) {
          setLoding(false);
          setToast({ message: "인증 코드가 불일치합니다.", visible: true });
        } else if (res.data.responseCode === 404) {
          setLoding(false);
          setToast({
            message: "메일이 존재하지 않습니다. 다른 메일로 시도해주세요.",
            visible: true,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  /** 이메일 인증코드 발송 함수 */
  const authRequest = async () => {
    setLoding(true);
    try {
      const res: any = await getFindMailAuth(myInfo.email);
      if (res.data.responseCode === 200) {
        setLoding(false);
        setVerifyMe(true);
        setToast({ message: "인증 코드를 전송하였습니다.", visible: true });
      } else if (res.data.responseCode === 201) {
        setLoding(false);
        setVerifyMe(true);
        setToast({
          message: "시간 초과로 인증코드를 다시 보냈습니다.",
          visible: true,
        });
      } else if (res.data.responseCode === 401) {
        setLoding(false);
        setToast({
          message: "등록된 이메일이 없습니다. 다시 시도해주세요.",
          visible: true,
        });
      } else if (res.data.responseCode === 403) {
        setLoding(false);
        setVerifyMe(true);
        setToast({
          message: "이미 메일이 전송되었습니다. 메일함을 확인해주세요.",
          visible: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChangePasswordWrap>
      <Content>
        <Text>비밀번호 변경</Text>
        <FormLabel>
          <Box $alignItems="center" $justifyContent="space-between">
            이메일 인증
            {verifyMe ? (
              <Timer setVerifyMe={setVerifyMe} />
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

const Text = styled.div`
  font-size: 20px;
  color: #cecece;
  line-height: 24px;
  text-align: center; /* 텍스트 가운데 정렬 */
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
