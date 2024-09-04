// Modal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';

interface styleI {
  $selected?: boolean
}

const Index: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [menuNumber, setMenuNumber] = useState<number>(1);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <MenuWrap>
          <MenuTitle 
          $selected={menuNumber === 1}
          onClick={()=>setMenuNumber(1)}>
            Login
          </MenuTitle>
          <MenuTitle 
          $selected={menuNumber === 2}
          onClick={()=>setMenuNumber(2)}>
            Signup
          </MenuTitle>
        </MenuWrap>
        {menuNumber === 1 && <Login/>}
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
  background: #ffffff7c;
  border-radius: 2px;
  width: 400px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #6b6b6b;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  margin: 32px 40px 8px 40px;
`

const MenuTitle = styled.div<styleI>`
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  
  ${({$selected})=> $selected && `border-bottom: 2px solid black;`}
`
