"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import usePointerCursor from "@/hooks/usePointerCursor";

const Chair = () => {
  const router = useRouter();
  /** 커서 스타일 커스텀 훅 */
  const { handlePointerOver, handlePointerOut } = usePointerCursor();
  /** 의자 glb모델 */
  const chairglb = useLoader(GLTFLoader, "/models/chair.glb");

  /** 의자 모델 style 변경 */
  useEffect(() => {
    chairglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: "#7b5d54",
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [chairglb]);

  return (
    <mesh
      rotation-y={Math.PI / 2}
      scale={5}
      position={[0, -5, 0]}
      castShadow
      receiveShadow
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      <primitive object={chairglb.scene} />
    </mesh>
  );
};

export default Chair;
