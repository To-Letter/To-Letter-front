import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressModal from './AddressModal';

interface kakaoLoginFormI {
  nickName: string;
  email: string;
  mailboxAddress: string;
}
interface defaultStyleProps {
  $direction?: 'row' | 'column'
  $justifyContent?: string
  $alignItems?: string
  $margin?: string
}

const KakaoSignup: React.FC = () => {
  const [signupForm, setSignupForm] = useState<kakaoLoginFormI>({
    nickName: "",
    email: "",
    mailboxAddress: ""
  });
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onChangheAddress = (address: string) => {
    setSignupForm(prev => ({
      ...prev,
      mailboxAddress: address
    }));
  };

  const onClickOpenModal = () => {
    setOpenAddressModal(prev => !prev)
  }

  useEffect(()=>{}, [openAddressModal, signupForm.mailboxAddress])
  

  const onClickSignup = () => {
    if (signupForm.email === '') {
      alert('이메일을 입력해주세요.');
    }  else if (signupForm.nickName === '') {
      alert('닉네임을 입력해주세요.');
    } else if (signupForm.mailboxAddress === '') {
      alert('우편함 주소를 입력해주세요.');
    }
    console.log("sign data: ", signupForm);
  };

  return (
    <SignupWrap>
      <SignupContent>
        <FormLabel>
          <Box $alignItems='center' $justifyContent='space-between'>
          NickName
          <Button>중복 체크</Button>
          </Box>
          <FormInput type='text' name="nickName" onChange={onChangeFormHdr} />
        </FormLabel>
        <FormLabel>
          Email
          <FormInput type='text' name="email" value={'tamd5971@gmail.com'} onChange={onChangeFormHdr} disabled />
        </FormLabel>
        <FormLabel>
          <Box $alignItems='center' $justifyContent='space-between' $margin='8px 0 0 0'>
            <Box $justifyContent='flex-start' $alignItems='center'>
              MailboxAddress
              <MailBoxSummry>
                ?
                <TipBox>
                  To Letter가 우편 배송 기간을 계산할 때 사용하는 도로명 주소 값으로, 실제 자신의 주소를 입력하지 않아도 괜찮아요!
                </TipBox>
              </MailBoxSummry>
            </Box>
            <Button onClick={onClickOpenModal}>주소 입력</Button>
          </Box>
          {
            signupForm.mailboxAddress !== '' &&
            <FormAddressInput>
              {signupForm.mailboxAddress} 
            </FormAddressInput>
          }
          
          {
            openAddressModal && <AddressModal onChangheAddress={onChangheAddress} onClickOpenModal={onClickOpenModal}/>
          }
        </FormLabel>
      </SignupContent>
      <SignupBtn onClick={onClickSignup}>Signup</SignupBtn>
    </SignupWrap>
  );
};

export default KakaoSignup;

export const Box = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({$direction}) => $direction};
  justify-content: ${({$justifyContent}) => $justifyContent};
  align-items: ${({$alignItems}) => $alignItems};
  margin: ${({$margin}) => $margin};
  position: relative;
`

const MailBoxSummry = styled.div`
  margin-left: 8px;
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

  &:hover > div {
    display: block;
  }
`;

const TipBox = styled.div`
  display: none;
  position: absolute;
  bottom: -88px; 
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

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 80px);
  margin: 12px 40px 20px 40px;
`;

const SignupContent = styled.div`
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

const FormAddressInput = styled.div`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 8px 0;
  font-size: 16px;
  margin-top: 8px;
  color: #ffffff;
`;

const Button = styled.div`
  width: 80px;
  border-radius: 1px;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  color: #e9e9e9;
  background-color: #262523;
  cursor: pointer;
`;

const SignupBtn = styled.div`
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

const SocialSignupWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FindAccountTextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #e9e9e9;
`;