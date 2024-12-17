// src/app/@modal/letter/letterbox/layout.tsx
"use client";
import { styled } from "styled-components";
import MenuTab from "@/components/molecules/MenuTab";
import { IoIosMail } from "react-icons/io";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";

export default function LetterBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLetterWriteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/userconfirm");
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <MailboxWrap>
          <Header>
            <MenuTab />
            <Exit onClick={handleExit}>X</Exit>
          </Header>
          {children}
          <LetterWriteButton onClick={handleLetterWriteClick}>
            <IoIosMail />
          </LetterWriteButton>
        </MailboxWrap>
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
  color: white;
`;

const ModalContent = styled.div`
  background: #000000a6;
  border-radius: 2px;
  width: 430px;
  height: 600px;
  max-width: 100%;
  box-shadow: 1px 1px 1px #0000005c;
  position: relative;
  padding: 20px;
`;

const MailboxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

const Exit = styled.div`
  position: absolute;
  right: -14px;
  top: -14px;
  padding: 4px 12px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const LetterWriteButton = styled.button`
  position: absolute;
  bottom: -6px;
  left: 386px;
  width: 50px;
  height: 50px;
  background-color: #595858;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #505050;
  }
`;
