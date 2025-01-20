"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { MainBox } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

export default function LetterEndContents() {
  const router = useRouter();
  /** 유저 정보 관리 */
  const { myInfo } = useUser();

  /** 회원 탈퇴 버튼 클릭 시 이동 */
  const onClickButton = () => {
    if (myInfo.userRole === "localLogin") {
      router.push("/mypage/letterend/localuserdelete");
    } else {
      router.push("/mypage/letterend/kakaouserdelete");
    }
  };

  return (
    <MainBox
      $direction="column"
      $alignItems="center"
      $justifyContent="center"
      $width="100%"
      $height="380px"
    >
      <Text $color="#cecece" $fontSize="16px" $margin="16px 40px 40px 40px">
        이제 편지는 안쓸래요!
      </Text>
      <Button
        title="버튼을 눌러 회원 탈퇴"
        $padding="8px 0"
        onClick={onClickButton}
      />
    </MainBox>
  );
}
