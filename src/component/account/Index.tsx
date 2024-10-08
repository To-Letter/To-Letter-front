// Modal.tsx
import React, { useState, useContext } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import KakaoSignup from "./KakaoSignup";
import MailVerify from "./MailVerify";
import { accountModalState } from "../../recoil/accountAtom";
import { useRecoilState } from "recoil";

interface styleI {
  $selected?: boolean;
}

const Index: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(accountModalState);

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <MenuWrap>
          <MenuTitle
            $selected={modalState.type === 'login'}
            onClick={() => {
              setModalState({
                isOpen: true,
                type: 'login', // 로그인 타입으로 설정
              });
            }}
          >
            Login
          </MenuTitle>
          <MenuTitle
            $selected={modalState.type !== 'login'}
            onClick={() => {
              setModalState({
                isOpen: true,
                type: 'signup', // 로그인 타입으로 설정
              });
            }}
          >
            Signup
          </MenuTitle>
        </MenuWrap>
        {modalState.type === 'login' && <Login />}
        {modalState.type === 'signup' && <Signup />}
        {modalState.type === 'kakaoSignup' && <KakaoSignup />}
        {modalState.type === 'MailVerify' && <MailVerify />}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Index;

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

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  margin: 32px 40px 8px 40px;
`;

const MenuTitle = styled.div<styleI>`
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  padding: 0 2px 4px 2px;

  ${({ $selected }) => $selected && `border-bottom: 2px solid white;`}
`;
