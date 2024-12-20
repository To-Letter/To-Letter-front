"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useRouter } from "next/navigation";

const Chair = () => {
  const router = useRouter();
  const { gl } = useThree();
  /** 의자 glb모델 */
  const chairglb = useLoader(GLTFLoader, "/models/chair.glb");

  /** 마우스 커서 포인터로 변경 */
  const handlePointerOver = () => {
    gl.domElement.style.cursor = "pointer";
  };

  /** 마우스 커서 기본으로 변경 */
  const handlePointerOut = () => {
    gl.domElement.style.cursor = "auto";
  };

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
