"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/canvas/Scene";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewLetterAlarmMessage } from "@/components/NewLetterAlarmMessage";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { progress } = useModelLoadingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** WebGL 콘솔 메시지 관리 */
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.WebGLRenderer: Context Lost")
      ) {
        return;
      }
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  /** 보호된 경로와 kakao 리다이렉션 페이지에서 모달 전환을 위한 파라미터 처리 */
  useEffect(() => {
    const showLogin = searchParams.get("showLogin");

    if (showLogin === "true") {
      // 패러렐 라우트를 사용하여 로그인 모달 표시
      router.push("/auth/login");
    }
    if (searchParams.get("modal") === "kakao-signup") {
      router.push("/auth/kakao");
    } else if (searchParams.get("modal") === "login") {
      router.push("/auth/login");
    }
  }, [searchParams, router]);

  useEffect(() => {
    /** 모델이 로드되지 않은 상태라면 가이드 페이지로 리다이렉트 */
    if (progress < 100) {
      router.push("/guide");
      return;
    }
  }, [progress, router]);

  /** 모델이 로드되지 않았다면 빈 화면을 보여줌 */
  if (progress < 100) return null;

  const isAuthorized =
    axiosInterceptor.defaults.headers.common["Authorization"] !== undefined;

  return (
    <main>
      <Canvas
        ref={canvasRef}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
      >
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
      {isAuthorized && <NewLetterAlarmMessage />}
    </main>
  );
}
