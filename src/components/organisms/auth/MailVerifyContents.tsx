import { ElementBox, MainBox, SectionBox } from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Timer from "@/components/molecules/Timer";
import Verify from "@/components/molecules/Verify";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

export default function MailVerifyContents() {
  const router = useRouter();
  // 인증요청 버튼 클릭했는지 여부
  const [verifyMe, setVerifyMe] = useState<boolean>(false);
  //사용자가 메일로 받은 인증키 입력 관리
  const [mailKey, setMailKey] = useState<string>("");

  /**
   * 서버 통신 함수 async 달아야함
   */
  const fecthMailVerify = () => {
    setVerifyMe(true);
  };
  const onChangeMailKey = (e: ChangeEvent<HTMLInputElement>) => {
    setMailKey(e.target.value);
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
              onClick={fecthMailVerify}
            />
          )}
        </Verify>
      </SectionBox>
      <SectionBox $width="100%">
        <Button
          title="Signup"
          $padding="8px 0"
          $margin="0 0 16px 0"
          onClick={() => {
            router.push("/auth/login");
          }}
        />
      </SectionBox>
      {/**
       * 토스트 메시지 자리
       */}
    </MainBox>
  );
}
