"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "../atoms/LoadingSpinner";

// Scene 컴포넌트를 동적으로 불러오기
const DynamicScene = dynamic(() => import("./SceneComponent"), {
  ssr: false, // 서버 사이드 렌더링 비활성화import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';

  loading: () => <LoadingSpinner />, // 로딩 중 표시할 컴포넌트
});

const Scene = () => {
  return <DynamicScene />;
};

export default Scene;
