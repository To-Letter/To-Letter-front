"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import styled, { keyframes } from "styled-components";

const LoadingSpinner: React.FC = () => {
  const isLoading = useRecoilValue(loadingState); // Recoil에서 로딩 상태 가져오기

  if (!isLoading) return null; // 로딩 중이 아닐 때는 컴포넌트를 렌더링하지 않음

  return (
    <SpinnerOverlay>
      <Spinner />
    </SpinnerOverlay>
  );
};

export default LoadingSpinner;
// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스피너가 표시될 때 화면을 어둡게 덮는 오버레이
const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// 스피너 자체
/*
Copyright (c) 2023 - WrmYT0bxW0 - https://codepen.io/WrmYT0bxW0/pen/WNeyPj

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/
const Spinner = styled.div`
  position: fixed;
  width: 34px;
  height: 34px;
  top: 50%;
  left: 50%;
  margin-left: -17px;
  margin-top: -17px;

  &:after,
  &:before {
    content: "";
    position: fixed;
    border: 3px solid white;
    width: 30px;
    height: 30px;
  }

  &:after {
    animation: ${spin} 2.5s linear infinite;
  }

  &:before {
    width: 44px;
    height: 44px;
    margin-left: -7px;
    margin-top: -7px;
    animation: ${spin} 2.5s linear infinite;
    animation-direction: reverse;
  }
`;
