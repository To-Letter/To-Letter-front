import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { shareLetterState } from "../recoil/shareLetterAtom";
import { useUser } from "../hook/useUser";
import sessionStorageService from "../utils/sessionStorageService";

const ShareLetterBtn: React.FC = () => {
  const [shareLetterRecoil, setShareLetterRecoil] =
    useRecoilState(shareLetterState);
  const { myInfo } = useUser();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.cleanup();
      window.Kakao.init("7df766006a2913dd75b028486db00859");
    }
  }, []);

  const kakaoImageUploding = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const imagePath = "/images/kakao_share_image.png"; // 로컬 이미지 경로
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

  const shareToKakao = async () => {
    try {
      if (sessionStorageService.get("accessToken") !== null) {
        const imageUrl = await kakaoImageUploding();
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

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다.");
    });
  };

  return (
    <div>
      {shareLetterRecoil && (
        <ModalOverlay>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ShareModalWrap>
              <Exit onClick={() => setShareLetterRecoil(false)}>X</Exit>
              <SnsButtonsWrap>
                <SnsButtons>
                  <KakaoShareButton onClick={shareToKakao}>
                    <KakaoIconImg src="/images/kakao_icon.png" alt="카카오톡" />
                    <KakaoTextDiv>카카오톡</KakaoTextDiv>
                  </KakaoShareButton>
                </SnsButtons>
              </SnsButtonsWrap>
              <UrlSection>
                <UrlInput value={window.location.href} readOnly />
                <CopyButton onClick={copyUrlToClipboard}>URL 복사</CopyButton>
              </UrlSection>
              {/* 다른 SNS 버튼 추가 */}
            </ShareModalWrap>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: #000000a6;
  border-radius: 2px;
  width: 400px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #0000005c;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Exit = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 4px 12px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const ShareModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 25px 40px;
`;

const SnsButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SnsButtonsWrap = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
`;

const KakaoShareButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`;

const KakaoIconImg = styled.img`
  width: 50px;
  height: 50px;
`;

const KakaoTextDiv = styled.div`
  color: white;
  margin-top: 5px;
`;

const UrlSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
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

const CopyButton = styled.button`
  padding: 3.5px 8px;
  background-color: #646262;
  color: white;
  border: none;
  cursor: pointer;
`;

export default ShareLetterBtn;
