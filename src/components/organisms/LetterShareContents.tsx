import React, { useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";
import { ElementBox } from "../atoms/Box";
import { Text } from "../atoms/Text";
import Button from "../atoms/Button";

/** 편지 공유 컴포넌트 */
const LetterShareContents: React.FC = () => {
  const router = useRouter();
  /** 유저 정보 커스텀 훅 */
  const { myInfo } = useUser();

  /** 카카오 서버에 이미지 업로드 */
  const kakaoImageUploading = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const imagePath = "/images/kakao_share_image.png";
      fetch(imagePath)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "kakao_share_image.png", {
            type: "image/png",
          });
          window.Kakao.Share.uploadImage({
            file: [file],
          })
            .then(function (response: any) {
              resolve(response.infos.original.url);
            })
            .catch(function (error: any) {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** 카카오 공유 함수 */
  const shareToKakao = async () => {
    try {
      if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
        const imageUrl = await kakaoImageUploading();
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "To.Letter",
            description: `${myInfo.nickname}님에게 편지를 보내보세요!`,
            imageUrl: imageUrl, // 업로드된 이미지 URL 사용
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
          buttons: [
            {
              title: "웹으로 이동",
              link: {
                mobileWebUrl: "https://developers.kakao.com",
                webUrl: "https://developers.kakao.com",
              },
            },
          ],
        });
      }
    } catch (error) {
      console.error("카카오톡 공유 중 오류가 발생했습니다:", error);
    }
  };

  /** 트위터 공유 함수 */
  const twitterShare = () => {
    const url = `${window.location.href}`;
    const text = `To.Letter ${myInfo.nickname}님에게 편지를 보내보세요!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl);
  };

  /** 페이스북 공유 함수 */
  function shareFacebook() {
    const sendUrl = window.location.href;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  /** URL 복사 */
  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다.");
    });
  };

  /** 카카오 초기화 */
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.cleanup();
      window.Kakao.init("7df766006a2913dd75b028486db00859");
    }
  }, []);

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
