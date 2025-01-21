"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ElementBox } from "../atoms/Box";
import { Text } from "../atoms/Text";
import Button from "../atoms/Button";

/** 편지 공유 컴포넌트 */
const LetterShareContents: React.FC = () => {
  const router = useRouter();
  /** 유저 정보 커스텀 훅 */
  const { myInfo } = useUser();
  /** 현재 URL */
  const [currentUrl, setCurrentUrl] = useState<string>("");
  /** CSR 확인을 위한 상태 */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);
  }, []);

  /** 카카오 서버에 이미지 업로드 */
  const kakaoImageUploading = async (): Promise<string> => {
    try {
      // 카카오 SDK 초기화 확인
      if (!window.Kakao?.isInitialized()) {
        throw new Error("Kakao SDK not initialized");
      }

      const imagePath = "/images/kakao_share_image.png";
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], "kakao_share_image.png", {
        type: "image/png",
      });

      const uploadResponse = await window.Kakao.Share.uploadImage({
        file: [file],
      });

      return uploadResponse.infos.original.url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  /** 카카오 공유 함수 */
  const shareToKakao = async () => {
    if (!mounted) return;
    try {
      // 카카오 SDK 초기화 확인
      if (!window.Kakao?.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      const imageUrl = await kakaoImageUploading();

      await window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "To.Letter",
          description: `${myInfo.nickname}님에게 편지를 보내보세요!`,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error("카카오톡 공유 중 오류가 발생했습니다:", error);
      // 사용자에게 오류 메시지 표시
      alert("카카오톡 공유 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  /** 트위터 공유 함수 */
  const twitterShare = () => {
    if (!mounted) return;
    const text = `To.Letter ${myInfo.nickname}님에게 편지를 보내보세요!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl);
  };

  /** 페이스북 공유 함수 */
  const shareFacebook = () => {
    if (!mounted) return;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + currentUrl);
  };

  /** URL 복사 */
  const copyUrlToClipboard = () => {
    if (!mounted) return;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("URL이 복사되었습니다.");
    });
  };

  /** 카카오 초기화 */
  useEffect(() => {
    if (mounted && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.cleanup();
      window.Kakao.init("7df766006a2913dd75b028486db00859");
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <ElementBox
      $width="100%"
      $height="100%"
      $justifyContent="center"
      $alignItems="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <ElementBox
        $width="400px"
        $direction="column"
        $alignItems="flex-start"
        style={{
          position: "relative",
          background: "#000000a6",
          borderRadius: "2px",
          boxShadow: "1px 1px 1px #0000005c",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text
          $fontSize="20px"
          $fontWeight="bold"
          $color="white"
          $isClickAble={true}
          style={{
            position: "absolute",
            top: "3px",
            right: "3px",
            padding: "4px 12px",
          }}
          onClick={() => router.back()}
        >
          X
        </Text>

        <ElementBox
          $width="calc(100% - 80px)"
          $margin="25px 40px"
          $direction="column"
          $alignItems="center"
          $justifyContent="center"
        >
          <ElementBox
            $width="100%"
            $justifyContent="flex-start"
            $alignItems="start"
          >
            <ElementBox $direction="row" $alignItems="center">
              <ShareButtonWrap onClick={shareToKakao}>
                <ShareImg src="/images/kakao_icon.png" alt="카카오톡" />
                <Text $color="white" $margin="5px 0 0 0">
                  카카오톡
                </Text>
              </ShareButtonWrap>
              <ShareButtonWrap onClick={twitterShare}>
                <ShareImg src="/images/x_icon.jpg" alt="X" />
                <Text $color="white" $margin="5px 0 0 0">
                  X
                </Text>
              </ShareButtonWrap>
              <ShareButtonWrap onClick={shareFacebook}>
                <ShareImg src="/images/facebook_icon.png" alt="페이스북" />
                <Text $color="white" $margin="5px 0 0 0">
                  페이스북
                </Text>
              </ShareButtonWrap>
            </ElementBox>
          </ElementBox>

          <ElementBox $width="100%" $alignItems="center" $margin="10px 0 0 0">
            <UrlInput value={window.location.href} readOnly />
            <Button
              title="URL 복사"
              onClick={copyUrlToClipboard}
              $width="auto"
              $padding="3.5px 8px"
              $fontSize="13.5px"
              $border="none"
              $backgroundColor="#646262"
            />
          </ElementBox>
        </ElementBox>
      </ElementBox>
    </ElementBox>
  );
};

const ShareButtonWrap = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0px 20px 0px 0px;
  cursor: pointer;
`;

const ShareImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UrlInput = styled.input`
  width: 237px;
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;

  &:focus {
    outline: none;
    border: none;
  }
`;

export default LetterShareContents;
