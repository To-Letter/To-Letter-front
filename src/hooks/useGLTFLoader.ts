"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect } from "react";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";

export const useGLTFLoader = (path: string) => {
  const { incrementLoadedCount } = useModelLoadingStore();
  const gltf = useLoader(GLTFLoader, path);

  useEffect(() => {
    // 모델 로드 완료 시 진행 상태 업데이트
    incrementLoadedCount();
  }, [gltf, incrementLoadedCount]); // path 대신 gltf에 의존

  return gltf;
};
