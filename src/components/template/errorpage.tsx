"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorPage: React.FC<ErrorPageProps> = ({ reset }) => {
  const router = useRouter();
  return (
    <Container>
      <Image src="/images/errorIcon.png" alt="Error" />
      <Message>잠시 연결이 불안해요</Message>
      <SubMessage>조금 뒤 다시 접속해 주세요</SubMessage>
      <HomeButton onClick={() => router.push("/")}>다시 돌아가기</HomeButton>
      <HomeButton onClick={reset}>다시 시도하기</HomeButton>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const Message = styled.h1`
  font-size: 24px;
  color: #333;
`;

const SubMessage = styled.p`
  font-size: 18px;
  color: #666;
`;

const HomeButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;
`;
