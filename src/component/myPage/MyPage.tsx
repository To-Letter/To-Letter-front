import React, { useState } from 'react'
import styled from 'styled-components';
import MyInfo from './myInfo';
import { useSetRecoilState } from 'recoil';
import { myPageModalState } from '../../recoil/myInfoAtom';
import { useUser } from '../../hook/useUser';
import ChangeAccount from './ChangeAccount';
import EndLetter from './EndLetter';

interface styleI {
  $selected?: boolean
}

export default function MyPage() {
  const [menuNumber, setMenuNumber] = useState<number>(1);
  const setMypageModalState = useSetRecoilState(myPageModalState);
  const {myInfo} = useUser();
 

  return (
    <ModalOverlay onClick={()=> setMypageModalState(false)}>
      <ModalContent onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}>
        <MenuWrap>
          <MenuTitle 
          $selected={menuNumber === 1}
          onClick={()=>setMenuNumber(1)}>
            My Info
          </MenuTitle>
          {
            myInfo.loginType === 'localLogin' &&
            <MenuTitle 
            $selected={menuNumber === 2}
            onClick={()=>setMenuNumber(2)}>
              Account
            </MenuTitle>
          }
          
          <MenuTitle 
          $selected={menuNumber === 3}
          onClick={()=>setMenuNumber(3)}>
            End Letter
          </MenuTitle>
        </MenuWrap>
        {menuNumber === 1 && <MyInfo/>}
        {menuNumber === 2 && <ChangeAccount/>}
        {menuNumber === 3 && <EndLetter />}
      </ModalContent>
    </ModalOverlay>
  );
}

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
`

const MenuTitle = styled.div<styleI>`
margin-right: 20px;
font-size: 18px;
font-weight: bold;
cursor: pointer;
color: white;
padding: 0 2px 4px 2px;

${({$selected})=> $selected && `border-bottom: 2px solid white;`}
`;