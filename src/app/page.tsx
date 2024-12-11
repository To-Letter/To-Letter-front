"use client"; // Canvas와 Recoil을 사용하므로 필수

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/canvas/Scene"; // 경로 수정
import axiosInterceptor from "@/lib/axiosInterceptor"; // 경로 수정

export default function Home() {
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
