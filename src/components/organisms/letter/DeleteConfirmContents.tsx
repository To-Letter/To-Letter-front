"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { deleteLetter } from "@/lib/api/controller/letter";
import { individualLetterState } from "@/store/recoil/letterAtom";
import { useRouter } from "next/navigation";
import ModalBox from "@/components/atoms/ModalBox";
import { ElementBox, MainBox, SectionBox } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

type StatusCode = 200 | 401 | 403;

interface propsI {
  mailIds: number[];
  onClose: () => void;
  type: "received" | "send";
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>> | null;
  setDeleteLetter?: React.Dispatch<React.SetStateAction<boolean>> | null;
  setConfirmMailDelete?: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const DeleteConfirmContents = ({
  mailIds,
  onClose,
  type = "received",
  setSearchTerm = null,
  setDeleteLetter = null,
  setConfirmMailDelete = null,
}: propsI) => {
  const router = useRouter();

  /** 편지 삭제 메시지 **/
  const message = useMemo(() => {
    if (type === "received") {
      return `선택한 편지를 버립니다.`;
    } else {
      return `선택한 편지를 보낸 편지함에서 버립니다.\n편지를 받은 사람은 계속 편지를\n열람할 수 있습니다.`;
    }
  }, [type]);

  /** 편지 삭제 api status code **/
  const STATUS_MESSAGES = {
    200: "편지를 버렸습니다.",
    401: "편지가 존재하지 않습니다.",
    403: "편지의 주인이 아닙니다.",
  } as const;

  /* 개별 편지 내용 recoil */
  const setIndividualLetterInfo = useSetRecoilState(individualLetterState);

  /** 편지 삭제 확인 버튼 클릭 시 실행 함수 **/
  const onClickConfirm = async () => {
    try {
      const res = await deleteLetter({ letterIds: mailIds, letterType: type });
      const statusCode = res.data.responseCode as StatusCode;
      const message = STATUS_MESSAGES[statusCode];

      if (message) {
        alert(message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("편지 삭제 중 오류 발생:", error);
      alert("편지 삭제 중 오류가 발생했습니다.");
    } finally {
      setIndividualLetterInfo({
        id: -9999,
        toUserNickname: "",
        letterContent: "",
        fromUserNickname: "",
        onDelete: false,
        tab: type,
      });

      if (setConfirmMailDelete !== null) {
        setConfirmMailDelete((prev) => !prev);
      }
      router.push(
        `/letter/letterdelete/${type === "received" ? "receive" : "send"}`
      );

      if (setSearchTerm !== null) {
        setSearchTerm("");
      }
      if (setDeleteLetter !== null) {
        setDeleteLetter((prev) => !prev);
      }
    }
  };

  return (
    <ModalBox isExitBtn={false}>
      <MainBox
        $width="400px"
        $direction="column"
        $justifyContent="center"
        $alignItems="center"
      >
        <SectionBox
          $width="calc(100% - 80px)"
          $direction="column"
          $justifyContent="center"
          $alignItems="center"
          $margin="20px 40px 24px 40px"
        >
          <ElementBox
            $width="100%"
            $direction="column"
            $justifyContent="center"
            $alignItems="center"
            $margin="16px 0"
          >
            <AnnouncementText $fontSize="16px" $color="#cecece">
              {message}
            </AnnouncementText>
            <Exit onClick={onClose}>X</Exit>
          </ElementBox>
          <Button
            title="편지 지우기"
            $padding="8px 0"
            onClick={onClickConfirm}
          />
        </SectionBox>
      </MainBox>
    </ModalBox>
  );
};

const AnnouncementText = styled(Text)`
  line-height: 24px;
  text-align: center; /* 텍스트 가운데 정렬 */
  white-space: pre-wrap; /* 줄바꿈을 포함한 공백 처리를 자연스럽게 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
`;

const Exit = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export default DeleteConfirmContents;
