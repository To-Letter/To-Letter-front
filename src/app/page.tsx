"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/canvas/Scene";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import "@/style/globals.css";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** kakao 리다이렉션 페이지에서 모달 전환을 위한 파라미터 처리 */
  useEffect(() => {
    if (searchParams.get("modal") === "kakao-signup") {
      router.push("/auth/kakao");
    } else if (searchParams.get("modal") === "login") {
      router.push("/auth/login");
    }
  }, [searchParams, router]);

  return (
    <main>
      <Canvas shadows>
        <Scene />
        {axiosInterceptor.defaults.headers.common["Authorization"] ===
          undefined && (
          <OrbitControls
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={1.396}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            enablePan={false}
            minDistance={3}
            maxDistance={3}
          />
        )}
        {axiosInterceptor.defaults.headers.common["Authorization"] !==
          undefined && (
          <OrbitControls
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={1.396}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            enablePan={false}
            minDistance={2}
            maxDistance={2}
          />
        )}
      </Canvas>
    </main>
  );
}
