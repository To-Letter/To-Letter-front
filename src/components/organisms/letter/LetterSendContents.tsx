import React, { useState } from "react";
import styled from "styled-components";
import ToastMessage from "@/components/atoms/ToastMessage";
import { useSetRecoilState, useRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import { sendLetter } from "@/lib/api/controller/letter";
import { nicknameAndContentsState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
}

const LetterSendContents: React.FC = () => {
  const router = useRouter();
  /* 토스트 메시지를 관리하는 state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  /* 보낸 편지함에 저장 여부를 관리하는 state */
  const [checked, setChecked] = useState(false);
  /* 로딩 상태를 관리하는 reocil */
  const setLoding = useSetRecoilState(loadingState);
  /* 받는 사람 닉네임과 편지내용을 관리하는 reocil */
  const [nicknameAndContents, setNicknameAndContents] = useRecoilState(
    nicknameAndContentsState
  );

  /** 보낸 편지함에 저장 여부를 관리하는 함수 */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  /** 편지 보내기 함수 */
  const letterSend = async () => {
    if (nicknameAndContents.contents === "") {
      setToast({
        message: "편지 내용을 입력해주세요.",
        visible: true,
      });
    }
    setLoding(true);
    try {
      const res: any = await sendLetter({
        contents: nicknameAndContents.contents,
        saveLetterCheck: checked,
        toUserNickname: nicknameAndContents.nickname,
      });
      if (res.data.responseCode === 200) {
        router.push("/");
        setNicknameAndContents({ nickname: "", contents: "" }); // 닉네임, 내용 초기화
        setLoding(false);
        alert("편지 보내기를 완료하였습니다!");
      } else if (res.data.responseCode === 403) {
        router.push("/letter/userconfirm");
        setLoding(false);
        alert("존재하지 않는 유저입니다. 다시 닉네임을 확인해주세요.");
      }
    } catch (error) {
      console.error("sendLetter Error:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <SendLetterModalWrap>
          <SendLetterModalContent>
            <ContentLabel>
              <ColumnBoxWrap>
                <Box $alignItems="center" $justifyContent="center">
                  편지를 이대로 보내시겠습니까
                  <SendLetterSummry>
                    ?
                    <TipBox>
                      ※ To. Letter의 편지는 유저들의 주소 거리에 기반하여 실제
                      우편 도착시간과 비슷합니다.
                    </TipBox>
                  </SendLetterSummry>
                </Box>
                <CheckboxLabel>
                  보낸 편지함에 저장
                  <SendLetterCheckbox
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                  />
                </CheckboxLabel>
              </ColumnBoxWrap>
            </ContentLabel>
          </SendLetterModalContent>
          <BtnWrap>
            <SendBtn onClick={letterSend}>예</SendBtn>
            <SendBtn onClick={() => router.push("/")}>아니요</SendBtn>
          </BtnWrap>
          {toast.visible && (
            <ToastMessage
              message={toast.message}
              onClose={() => setToast({ ...toast, visible: false })}
            />
          )}
        </SendLetterModalWrap>
      </ModalContent>
    </ModalOverlay>
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
  background: #000000a6;
  border-radius: 2px;
  width: 400px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #0000005c;
`;

const SendLetterModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 12px 40px;
`;

const SendLetterModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`;

const ContentLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
`;

const ColumnBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  position: relative;
`;

export const SendLetterSummry = styled.div`
  margin-left: 2px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  color: #e9e9e9;

  &:hover > div {
    display: block;
  }
`;

export const TipBox = styled.div`
  display: none;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: break-spaces;
  z-index: 10;
  width: 200px;
  text-align: center;
  word-break: keep-all;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
`;
const SendLetterCheckbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

const BtnWrap = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: calc(100% - 80px);
  margin: 0px 40px 16px 40px;
`;

const SendBtn = styled.div`
  width: 30%;
  border: 1px solid #e9e9e9;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
  color: #e9e9e9;
  background-color: #262523;
  cursor: pointer;
`;

export default LetterSendContents;
