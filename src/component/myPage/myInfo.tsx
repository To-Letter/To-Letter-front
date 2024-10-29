// Modal.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../hook/useUser';
import { Box, Button, FormAddressInput, MailBoxSummry, TipBox } from '../account/Signup';
import AddressModal from '../account/AddressModal';
import { useNavigate } from 'react-router-dom';
import { getLogout, putUserInfoUpdate } from '../../apis/controller/account';
import { useSetRecoilState } from 'recoil';
import { myPageModalState } from '../../recoil/myInfoAtom';
import ToastMessage from '../ToastMessage';


interface myInfoI {
  email: string
  address: string
  nickname: string
}

interface styleI {
  $disabled?: boolean
}

export default function MyInfo() {
  const {myInfo,resetMyInfo, updateMyInfo} = useUser();
  
  const navigate = useNavigate();
  const [myInfoForm, setmyInfoIForm] = useState<myInfoI>({
    email: myInfo.email,
    address: myInfo.address,
    nickname: myInfo.nickname
  })
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const setMypageModalState = useSetRecoilState(myPageModalState)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });



  const onClickUpdata = async () => {
    const res = await putUserInfoUpdate({address: myInfoForm.address, nickname: myInfoForm.nickname});
    if(res.data.responseCode === 200){
      updateMyInfo({
        address: myInfo.address,
        nickname: myInfo.nickname
      })
      setToast({ message: "정상적으로 변경되었습니다.", visible: true });
    }
  }

  const onClickLogout = async () => {
    try {
      await getLogout();
      resetMyInfo();

      setMypageModalState(false);

      navigate("/");
    } catch (error) {
      console.log("try-catch error",error)
    }
  }

  const onClickOpenModal = () => {
    setOpenAddressModal((prev) => !prev);
  };

  const onChangheAddress = (address: string) => {
    setmyInfoIForm((prev) => ({
      ...prev,
      address: address,
    }));
  };

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>)=>{
    setmyInfoIForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(()=>{
    setmyInfoIForm({
      email: myInfo.email,
      address: myInfo.address,
      nickname: myInfo.nickname
    })
  },[myInfo.address, myInfo.nickname])

  return (
    <MyPageWrap>
      <MyPageContent>
          <FormLabel>
            Email
            <FormInput type='text' name="email" value={myInfoForm.email} disabled $disabled={true}/>
          </FormLabel>
          <FormLabel>
            nickname
            <FormInput type='text' name="nickname" value={myInfoForm.nickname} onChange={onChangeFormHdr} />
          </FormLabel>
          <FormLabel>
          <Box $alignItems="center" $justifyContent="space-between">
            <Box $justifyContent="flex-start" $alignItems="center">
              MailboxAddress
              <MailBoxSummry>
                ?
                <TipBox>
                  To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소
                  값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
                </TipBox>
              </MailBoxSummry>
            </Box>
            <Button onClick={onClickOpenModal}>주소 입력</Button>
          </Box>
          {myInfoForm.address !== "" && (
            <FormAddressInput>{myInfoForm.address}</FormAddressInput>
          )}

          {openAddressModal && (
            <AddressModal
              onChangheAddress={onChangheAddress}
              onClickOpenModal={onClickOpenModal}
            />
          )}
        </FormLabel>
      </MyPageContent>
      <MyPageBtn onClick={onClickUpdata}>내 정보 수정하기</MyPageBtn>
      <SocialMyPageWrap>
      <MyPageBtn onClick={onClickLogout}>Logout</MyPageBtn>
      </SocialMyPageWrap>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </MyPageWrap>
  );
};


const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);;
  margin: 12px 40px 20px 40px;
`;

const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`;


const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  color: #cecece;
`
const FormInput = styled.input<styleI>`
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

  ${({$disabled})=> $disabled && `color: #858585;`}
`

const MyPageBtn = styled.div`
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

const SocialMyPageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
