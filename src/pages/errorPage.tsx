import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image src="/images/errorIcon.png" alt="Error" />
      <Message>잠시 연결이 불안해요</Message>
      <SubMessage>조금 뒤 다시 접속해 주세요</SubMessage>
      <HomeButton onClick={()=>navigate('/')}>다시 돌아가기</HomeButton>
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
`
