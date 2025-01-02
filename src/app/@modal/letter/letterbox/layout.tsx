"use client";

import { styled } from "styled-components";
import MenuTab from "@/components/molecules/MenuTab";
import { IoIosMail } from "react-icons/io";
/* import axiosInterceptor from "@/lib/api/axiosInterceptor"; */
import { useRouter } from "next/navigation";
import ModalBox from "@/components/atoms/ModalBox";
import { HeaderBox } from "@/components/atoms/Box";

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
    /*     if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/userconfirm");
    } */
    router.push("/letter/userconfirm");
  };

  return (
    <ModalBox
      $width="430px"
      $height="600px"
      $padding="20px"
      $direction="column"
      $alignItems="flex-start"
    >
      <HeaderBox $width="100%" $padding="8px 0">
        <MenuTab />
      </HeaderBox>
      {children}
      <LetterWriteButton onClick={handleLetterWriteClick}>
        <IoIosMail />
      </LetterWriteButton>
    </ModalBox>
  );
}
const LetterWriteButton = styled.button`
  position: absolute;
  bottom: 16px;
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
