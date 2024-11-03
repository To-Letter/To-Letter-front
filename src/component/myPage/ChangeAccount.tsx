import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import Timer from '../account/Timer';
import ToastMessage from '../ToastMessage';
import ChangePassMailVerify from './ChangePassMailVerify';
import ChangePassword from './ChangePassword';

export default function ChangeAccount() {
  const [check, setCheck] = useState<boolean>(false);

  
  return (
    <ChangePasswordWrap>
      {!check && <ChangePassMailVerify setCheck={setCheck}/>}
      {check && <ChangePassword/>}
    </ChangePasswordWrap>
  )
}

const ChangePasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 380px;
  align-items: center;
  justify-content: start;
  width: calc(100% - 80px);;
  margin: 12px 40px 20px 40px;
`;
