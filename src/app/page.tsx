"use client"; // Canvas와 Recoil을 사용하므로 필수

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/canvas/Scene"; // 경로 수정
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import "@/style/globals.css";
import { useRouter } from "next/navigation";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";
import { useEffect } from "react";
/* import { useEffect } from "react";
import { useRouter } from "next/navigation"; */

export default function Home() {
  /*   const router = useRouter();
  useEffect(() => {
    // 자주 사용되는 모달 경로들을 미리 프리페치
    router.prefetch("/login");
    router.prefetch("/signup");
    // ... 다른 모달 경로들
  }, [router]); */

  const router = useRouter();
  const { progress } = useModelLoadingStore();

  useEffect(() => {
    // 모델이 로드되지 않은 상태라면 가이드 페이지로 리다이렉트
    if (progress < 100) {
      router.push("/guide");
      return;
    }

    // 자주 사용되는 모달 경로들을 미리 프리페치
    router.prefetch("/login");
    router.prefetch("/signup");
  }, [progress, router]);

  // 모델이 로드되지 않았다면 빈 화면을 보여줌
  if (progress < 100) return null;

  const isAuthorized =
    axiosInterceptor.defaults.headers.common["Authorization"] !== undefined;

  return (
    <main>
      <Canvas shadows>
        <Scene />
        <OrbitControls
          minPolarAngle={Math.PI / (isAuthorized ? 2.8 : 2.5)}
          maxPolarAngle={1.396}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enablePan={false}
          minDistance={isAuthorized ? 2 : 3}
          maxDistance={isAuthorized ? 2 : 3}
        />
      </Canvas>
    </main>
  );
}
