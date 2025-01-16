"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { getKakaoDeleteURL } from "@/lib/api/controller/account";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import ToastMessage from "@/components/atoms/ToastMessage";
import { MainBox, SectionBox } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

export default function KakaoUserDeleteContents() {
  /** 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /** 로딩 상태를 관리하는 recoil */
  const setLoding = useSetRecoilState(loadingState);

  /** 카카오 회원 탈퇴 버튼 클릭 시 Redirection 이동 함수 */
  const onClickKakaoDelete = async () => {
    try {
      setLoding(true);

      /* 현재 로그인된 상태의 토큰을 세션스토리지에 저장 */
      const currentAccessToken =
        axiosInterceptor.defaults.headers.common["Authorization"];
      const currentRefreshToken =
        axiosInterceptor.defaults.headers.common["refreshToken"];

      if (currentAccessToken && currentRefreshToken) {
        /* 세션스토리지에 현재 토큰 저장 */
        sessionStorage.setItem("accessToken", currentAccessToken.toString());
        sessionStorage.setItem("refreshToken", currentRefreshToken.toString());
      }

      const res: any = await getKakaoDeleteURL();

      if (res.data.responseCode === 200) {
        window.location.href = res.data.responseData;
      }
    } catch (err: any) {
      setLoding(false);
      console.error("kakao Login Error:", err);
      alert("kakao Login code Error");
      setToast({
        message: "카카오 코드 받아오기에 실패 하였습니다. 다시 시도해주세요.",
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
        <Announcement
          $color="#cecece"
          $fontSize="16px"
          $margin="16px 40px 40px 40px"
        >
          {`회원 탈퇴시에도\n상대방에게 보낸 편지는\n그대로 남게 되며\n삭제된 계정의 편지는\n복구 되지 않습니다.`}
        </Announcement>
        <Button
          title="계정 삭제"
          $padding="8px 0"
          onClick={onClickKakaoDelete}
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
