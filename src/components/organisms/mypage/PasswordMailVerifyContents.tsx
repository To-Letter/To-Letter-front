"use client";

import React, { ChangeEvent, useState } from "react";
import Timer from "@/components/molecules/Timer";
import ToastMessage from "@/components/atoms/ToastMessage";
/* import { loadingState } from "@/store/recoil/loadingAtom";
import { useSetRecoilState } from "recoil";
import { getFindMailAuth, postEmailVerify } from "@/lib/api/controller/account";
import { useUser } from "@/hooks/useUser";
import { emailVerifyAuthType } from "@/constants/emailVerify";
import { useRouter } from "next/navigation"; */
import Verify from "@/components/molecules/Verify";
import Button from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { MainBox, SectionBox } from "@/components/atoms/Box";

export default function PasswordMailVerifyContents() {
  /*   const router = useRouter(); */
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 인증 번호 관리 state */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mailKey, setMailKey] = useState<string>("");
  /** 이메일 인증 여부 */
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  /** 유저 정보 관리 */
  /*   const { myInfo } = useUser(); */
  /** 로딩 상태를 관리하는 recoil */
  /*   const setLoding = useSetRecoilState(loadingState); */

  /** 인증 번호 입력 업데이트 함수 */
  const onChangeMailKey = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
  };

  /** 인증 코드 확인 함수 */
  /*   const onClickMailVerify = async () => {
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
          router.push("/mypage/passwordmailverify/passwordchange");
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
  }; */

  /** 이메일 인증코드 발송 함수 */
  /*   const authRequest = async () => {
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
  }; */

  return (
    <MainBox
      $direction="column"
      $alignItems="flex-start"
      $width="100%"
      $height="380px"
    >
      <SectionBox $direction="column" $width="100%" $margin="24px 0">
        <Text $color="#cecece" $fontSize="20px" $margin="0 0 8px 0">
          비밀번호 변경
        </Text>
        <Verify onChangeMailKey={onChangeMailKey} message={verifyMe}>
          {verifyMe ? (
            <Timer setVerifyMe={setVerifyMe} />
          ) : (
            <Button
              title="인증 요청"
              $width="80px"
              $padding="2px 0"
              /* onClick={authRequest} */
              onClick={() => {}}
            />
          )}
        </Verify>
      </SectionBox>
      <Button
        title="인증 코드 확인"
        $padding="8px"
        /* onClick={onClickMailVerify} */
        onClick={() => {}}
      />
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </MainBox>
  );
}
