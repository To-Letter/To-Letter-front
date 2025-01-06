"use client"; // Canvas와 Recoil을 사용하므로 필수

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/canvas/Scene"; // 경로 수정
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import "@/style/globals.css";
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
