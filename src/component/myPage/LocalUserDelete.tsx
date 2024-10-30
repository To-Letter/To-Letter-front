import React, { ChangeEvent, useMemo, useState } from 'react'
import styled from 'styled-components';
import { useUser } from '../../hook/useUser';
import { deleteLocalUser } from '../../apis/controller/account';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../recoil/loadingAtom';
import ToastMessage from '../ToastMessage';
import { useNavigate } from 'react-router-dom';
import { myPageModalState } from '../../recoil/myInfoAtom';

export default function LocalUserDelete() {
  const setLoding = useSetRecoilState(loadingState)
  const {myInfo} = useUser();
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const navigate = useNavigate();
  const setMyPageModal = useSetRecoilState(myPageModalState);
  
  const onChangeFistPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickButton = async () => {
    setLoding(true);
    const res:any = await deleteLocalUser({email: myInfo.email, password:password});

    if (res.data.responseCode === 200) {
      setLoding(false);
      alert("회원 탈퇴가 완료되었습니다.")
      setMyPageModal(false);
      navigate("/");
    } else {
      setLoding(false);
      setToast({ message: "잘못된 비밀번호입니다. 다시 시도해주세요.", visible: true });
    }
  }

  return (
    <UserDeleteWrap>
        <Text>{`회원 탈퇴시에도\n상대방에게 보낸 편지는\n그대로 남게 되며\n삭제된 계정의 편지는\n복구 되지 않습니다.`}</Text>
        <FormLabel>
          비밀번호 입력
          <FormInput type="password" onChange={onChangeFistPass} />
        </FormLabel>
        <Button onClick={onClickButton}>계정 삭제</Button>
        {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </UserDeleteWrap>
  )
}

const UserDeleteWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 380px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 12px 40px 20px 40px;
`;


const Text = styled.div`
  font-size: 16px;
  color: #cecece;
  padding: 16px 40px 0 40px;
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

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  width: 100%;
  color: #cecece;
`;

const FormInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  width: 100%;
  height: 28px;
  font-size: 20px;
  margin-top: 8px;
  color: #ffffff;
  &:focus {
    outline: none; /* 기본 outline 제거 */
    box-shadow: none; /* 기본 box-shadow 제거 */
  }
  &:-internal-autofill-selected {
    border: none;
    background-color: transparent;
    border-bottom: 1px solid white;
    width: 100%;
    height: 28px;
    font-size: 20px;
    margin-top: 8px;
    color: #ffffff;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 5000s ease-in-out 0s;
    border-bottom: 1px solid white;
  }
`;