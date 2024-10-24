import React from "react";
import styled from "styled-components";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <Image src="/images/errorIcon.png" alt="Error" />
      <Message>잠시 연결이 불안해요</Message>
      <SubMessage>조금 뒤 다시 접속해 주세요</SubMessage>
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
