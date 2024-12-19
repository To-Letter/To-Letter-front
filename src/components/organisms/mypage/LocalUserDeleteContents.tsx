"use client";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import { deleteLocalUser } from "@/lib/api/controller/account";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import ToastMessage from "@/components/atoms/ToastMessage";
import { useRouter } from "next/navigation";
import InputForm from "@/components/molecules/InputForm";
import { MainBox, SectionBox } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

export default function LocalUserDeleteContents() {
  const router = useRouter();
  /** 유저 정보 관리 */
  const { myInfo } = useUser();
  /** 유저 삭제에 필요한 인증 과정 비밀번호 관리 */
  const [password, setPassword] = useState<string>("");
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 로딩 상태를 관리하는 recoil */
  const setLoding = useSetRecoilState(loadingState);

  /** 비밀번호 입력 업데이트 함수 */
  const onChangeFistPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /** 계정 삭제 버튼 클릭 함수 */
  const onClickLocalDelete = async () => {
    setLoding(true);
    const res: any = await deleteLocalUser({
      email: myInfo.email,
      password: password,
    });

    if (res.data.responseCode === 200) {
      setLoding(false);
      alert("회원 탈퇴가 완료되었습니다.");
      router.push("/");
    } else {
      setLoding(false);
      setToast({
        message: "잘못된 비밀번호입니다. 다시 시도해주세요.",
        visible: true,
      });
    }
  };

  return (
    <MainBox $width="100%" $height="380px">
      <SectionBox
        $width="100%"
        $direction="column"
        $alignItems="center"
        $justifyContent="center"
      >
        <Announcement $color="#cecece" $fontSize="16px" $margin="16px 40px ">
          {`회원 탈퇴시에도\n상대방에게 보낸 편지는\n그대로 남게 되며\n삭제된 계정의 편지는\n복구 되지 않습니다.`}
        </Announcement>
        <InputForm
          keyValue={"password"}
          labelTitle="비밀번호 입력"
          type="password"
          name="password"
          onChange={onChangeFistPass}
        />
        <Button
          title="계정 삭제"
          $padding="8px 0"
          $margin="16px 0 0 0"
          onClick={onClickLocalDelete}
        />
        {toast.visible && (
          <ToastMessage
            message={toast.message}
            onClose={() => setToast({ ...toast, visible: false })}
          />
        )}
      </SectionBox>
    </MainBox>
  );
}

const Announcement = styled(Text)`
  text-align: center; /* 텍스트 가운데 정렬 */
  white-space: pre-wrap; /* 줄바꿈을 포함한 공백 처리를 자연스럽게 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
`;
