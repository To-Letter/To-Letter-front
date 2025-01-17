"use client";

import { MainBox, SectionBox } from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import ToastMessage from "@/components/atoms/ToastMessage";
import Timer from "@/components/molecules/Timer";
import Verify from "@/components/molecules/Verify";
import { emailVerifyAuthType } from "@/constants/emailVerify";
import { getEmialAuth, postEmailVerify } from "@/lib/api/controller/account";
import { signupState } from "@/store/recoil/accountAtom";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function MailVerifyContents() {
  const router = useRouter();
  /** 인증요청 버튼 클릭 여부 관리 state */
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  /** 사용자가 메일로 받은 인증키 입력 관리 state */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mailKey, setMailKey] = useState<string>("");
  /** 토스트 메시지 관리 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 인증요청 메시지 관리 state */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authReqMessage, setAuthReqMessage] = useState<boolean>(false);
  /** 회원가입 정보 관리 recoil */
  const signupForm = useRecoilValue(signupState);
  /** 로딩 상태 관리 recoil */
  const setLoding = useSetRecoilState(loadingState);

  /** 인증키 입력 업데이트 함수 */
  const onChangeMailKey = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
  };

  /** 이메일 인증코드 발송 api 통신 및 응답 처리 함수 */
  const authRequest = async () => {
    setLoding(true);
    try {
      const res: any = await getEmialAuth({ email: signupForm.email });
      if (res.data.responseCode === 200) {
        setLoding(false);
        setAuthReqMessage(true);
        setVerifyMe(true);
      } else if (res.data.responseCode === 201) {
        setLoding(false);
        setAuthReqMessage(true);
        setVerifyMe(true);
        setToast({
          message: "시간 초과로 인증코드를 다시 보냈습니다.",
          visible: true,
        });
      } else if (res.data.responseCode === 401) {
        setLoding(false);
        setToast({
          message: "이미 인증코드를 전송 하였습니다.",
          visible: true,
        });
      } else if (res.data.responseCode === 403) {
        setLoding(false);
        alert("이미 이메일 인증을 완료했습니다. 로그인을 해주세요!");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /** 이메일 인증 요청 api 통신 및 응답 처리 함수 */
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
        setLoding(true);
        const res: any = await postEmailVerify({
          email: signupForm.email,
          randomCode: mailKey,
          authType: emailVerifyAuthType.signup,
        });

        if (res.data.responseCode === 200) {
          setLoding(false);
          alert("회원가입 성공!");
          router.push("/auth/login");
        } else if (res.data.responseCode === 401) {
          setLoding(false);
          setAuthReqMessage(true);
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
          alert("메일이 존재하지 않습니다. 다른 메일로 시도해주세요.");
          router.push("/auth/signup");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <MainBox
      $direction="column"
      $justifyContent="center"
      $alignItems="flex-start"
      $width="100%"
    >
      <SectionBox
        $direction="column"
        $justifyContent="center"
        $alignItems="flex-start"
        $margin="16px 0"
        $width="100%"
      >
        <Verify onChangeMailKey={onChangeMailKey} message={verifyMe}>
          {verifyMe ? (
            <Timer setVerifyMe={setVerifyMe} />
          ) : (
            <Button
              title="인증 요청"
              $width="80px"
              $padding="2px 0"
              onClick={authRequest}
            />
          )}
        </Verify>
      </SectionBox>
      <SectionBox $width="100%">
        <Button
          title="Signup"
          $padding="8px 0"
          $margin="0 0 16px 0"
          onClick={submitSignup}
        />
      </SectionBox>
      <Text $color="#e9e9e9" $fontSize="10px" $margin="0 0 24px 0">
        {authReqMessage && "이메일 인증코드가 발송되었습니다."}
      </Text>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </MainBox>
  );
}
