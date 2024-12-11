"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useRouter } from "next/router";

const Chair = () => {
  const chairglb = useLoader(GLTFLoader, "/models/chair.glb");
  const meshRef = useRef<THREE.Mesh>(null);
  const router = useRouter();

  useEffect(() => {
    chairglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: "#7b5d54",
        }); // 나무 색상으로 변경
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [chairglb]);

  return (
    <mesh
      ref={meshRef}
      rotation-y={Math.PI / 2}
      scale={5}
      position={[0, -5, 0]}
      castShadow
      receiveShadow
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      <primitive object={chairglb.scene} />
    </mesh>
  );
};

export default Chair;