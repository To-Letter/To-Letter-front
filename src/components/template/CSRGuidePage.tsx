"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import styled from "styled-components";

// Canvas 관련 컴포넌트들을 동적으로 import
const PreloadScene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});
const GuideLoading = dynamic(() => import("@/components/atoms/GuideLoading"), {
  ssr: false,
});

const CSRGuidePage = () => {
  return (
    <>
      {/* 숨겨진 캔버스에서 모델 프리로딩 */}
      <HideBox>
        <Canvas>
          <PreloadScene />
        </Canvas>
      </HideBox>

      <GuideLoading />
    </>
  );
};

export default CSRGuidePage;

const HideBox = styled.div`
  /* visibility: hidden; */
`;
