"use client";

import { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import SceneryIndex from "./Scenery/SceneryIndex";
/* import axiosInterceptor from "@/lib/api/axiosInterceptor"; */

const SceneComponent = memo(() => {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 5],
        fov: 75,
      }}
    >
      <Suspense fallback={null}>
        <Room />
        <SceneryIndex />
      </Suspense>
    </Canvas>
  );
});

SceneComponent.displayName = "SceneComponent";

export default SceneComponent;
