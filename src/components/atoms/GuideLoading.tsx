"use client";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";
import React from "react";
import { keyframes, styled } from "styled-components";
import { Text } from "./Text";
import Image from "next/image";
import { ElementBox, SectionBox } from "./Box";
import { useRouter } from "next/navigation";

export default function GuideLoading() {
  const router = useRouter();
  const { progress } = useModelLoadingStore();

  return (
    <Overlay
      $width="180px"
      $height="100px"
      $justifyContent="space-around"
      $alignItems="center"
      $margin="8px"
      $padding="16px"
      $borderRadius="8px"
      $backgroundColor="rgba(0, 0, 0, 0.5)"
    >
      <ElementBox
        $direction="column"
        $justifyContent="center"
        $alignItems="center"
        $margin="20px 0 0 16px"
      >
        <Spinner />
        <Text $color="white" $fontWeight="bold" $margin="8px 0 0 0">
          {Math.round(progress)}%
        </Text>
      </ElementBox>
      <ElementBox $margin="0 0 0 16px">
        {progress >= 100 && (
          <MoveRootPage onClick={() => router.push("/")}>
            <Image
              alt="To.Letter Start!"
              width={72}
              height={72}
              src={"/images/guideStart.png"}
            />
          </MoveRootPage>
        )}
        {progress < 100 && (
          <Image
            alt="To.Letter Wait.."
            width={72}
            height={72}
            src={"/images/guideWait.png"}
          />
        )}
      </ElementBox>
    </Overlay>
  );
}

// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스피너가 표시될 때 화면을 어둡게 덮는 오버레이
const Overlay = styled(SectionBox)`
  position: fixed;
  bottom: 0;
  right: 0;
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
  width: 34px;
  height: 34px;

  &:after,
  &:before {
    content: "";
    position: fixed;
    border: 3px solid white;
    width: 18px;
    height: 18px;
  }

  &:after {
    animation: ${spin} 2.5s linear infinite;
  }

  &:before {
    width: 32px;
    height: 32px;
    margin-left: -7px;
    margin-top: -7px;
    animation: ${spin} 2.5s linear infinite;
    animation-direction: reverse;
  }
`;

const MoveRootPage = styled(ElementBox)`
  cursor: pointer;
`;
