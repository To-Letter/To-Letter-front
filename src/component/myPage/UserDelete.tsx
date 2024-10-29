import React, { useMemo, useState } from 'react'
import styled from 'styled-components';

export default function UserDelete() {
  const [onClickCloseAccount, setOnClickCloseAccount] = useState<boolean>(false);

  const message = useMemo(() => {
    if(!onClickCloseAccount){
      return {
        message: "이제 편지는 안쓸래요!",
        button: "버튼을 눌러 회원 탈퇴"
      }
    }else{
      return {
        message: `회원 탈퇴시에도\n상대방에게 보낸 편지는\n그대로 남게 되며\n삭제된 계정의 편지는\n복구 되지 않습니다.`,
        button: "계정 삭제"
      }
    }
  },[onClickCloseAccount]);

  const onClickButton = () => {
    if(onClickCloseAccount){
      console.log("회원 삭제")
    }else{
      setOnClickCloseAccount(true);
    }
  }

  return (
    <UserDeleteWrap>
        <Text>{message.message}</Text>
        <Button onClick={onClickButton}>{message.button}</Button>
    </UserDeleteWrap>
  )
}

const UserDeleteWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 380px;
  align-items: center;
  justify-content: center;
  width: calc(100% - 80px);;
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
`

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
`