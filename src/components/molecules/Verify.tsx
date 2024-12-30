import React, { ChangeEvent } from "react";
import { styled } from "styled-components";
import { ElementBox } from "../atoms/Box";
import { Text } from "../atoms/Text";

export default function Verify({
  children,
  message,
  onChangeMailKey,
}: {
  children: React.ReactNode;
  message: boolean;
  onChangeMailKey: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormLabel>
      <ElementBox $alignItems="center" $justifyContent="space-between">
        이메일 인증
        {children}
      </ElementBox>
      <FormInput type="text" onChange={onChangeMailKey} />
      <Text $fontSize="10px" $margin="10px 0 0 0">
        {message && "이메일 인증코드가 발송되었습니다."}
      </Text>
    </FormLabel>
  );
}

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
