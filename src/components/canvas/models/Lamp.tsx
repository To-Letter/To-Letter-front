"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const Lamp = () => {
  /** 램프 glb모델 */
  const lampglb = useLoader(GLTFLoader, "/models/desklamp.glb");

  /** 램프 모델 style 변경 */
  useEffect(() => {
    const materialMap: { [key: string]: string } = {
      Cube: "#76503D",
      Cube001: "#2B1B0E",
      Cylinder001: "#885F3F",
      Cylinder002: "#C5AD91",
      Cylinder003_1: "#C5AD91",
      Cylinder003_2: "#E5E1B2",
      Cylinder003_3: "#E5E1B2",
      Cylinder_1: "#C7B496",
      Cylinder_2: "#C7B496",
    };

    lampglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (materialMap[mesh.name]) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: materialMap[mesh.name],
          });
        }
      }
    });
  }, [lampglb]);

  return (
    <>
      {/* 램프 */}
      <mesh rotation-y={-Math.PI / 2} scale={0.4} position={[-6.5, -2.1, -2.8]}>
        <primitive object={lampglb.scene} />
      </mesh>
    </>
  );
};

export default Lamp;
