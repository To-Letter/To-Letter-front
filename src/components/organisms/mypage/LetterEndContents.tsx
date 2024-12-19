import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function LetterEndContents() {
  const router = useRouter();
  /** 유저 정보 관리 */
  const { myInfo } = useUser();

  /** 회원 탈퇴 버튼 클릭 시 이동 */
  const onClickButton = () => {
    if (myInfo.userRole === "local") {
      router.push("/mypage/localuserdelete");
    } else {
      router.push("/mypage/kakaouserdelete");
    }
  };

  return (
    <UserDeleteWrap>
      <Text>이제 편지는 안쓸래요!</Text>
      <Button onClick={onClickButton}>버튼을 눌러 회원 탈퇴</Button>
    </UserDeleteWrap>
  );
}

const UserDeleteWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 380px;
  align-items: center;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

const Text = styled.div`
  font-size: 16px;
  color: #cecece;
  padding: 16px 40px 40px 40px;
  line-height: 24px;
  text-align: center; /* 텍스트 가운데 정렬 */
  white-space: pre-wrap; /* 줄바꿈을 포함한 공백 처리를 자연스럽게 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
`;

const Button = styled.div`
  width: 100%;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
  color: #e9e9e9;
  background-color: #262523;

  cursor: pointer;
`;
