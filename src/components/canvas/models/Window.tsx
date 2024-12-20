"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const Window = () => {
  /** 창문 glb 모델 */
  const windowglb = useLoader(GLTFLoader, "/models/window.glb");
  /** 커튼 glb 모델 */
  const curtainglb = useLoader(GLTFLoader, "/models/curtain.glb");

  /** 창문 style 변경 */
  useEffect(() => {
    windowglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === "Object001") {
          mesh.material = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
          });
        } else {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
        }
      }
    });
    curtainglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#7b5d54",
        });
        if (
          mesh.name === "Plane011" ||
          mesh.name === "Plane012" ||
          mesh.name === "Line007" ||
          mesh.name === "Line008" ||
          mesh.name === "Box003" ||
          mesh.name === "Box004"
        ) {
          mesh.visible = false;
        }
      }
    });
  }, [windowglb, curtainglb]);

  return (
    <>
      {/* 창문 */}
      <mesh rotation-y={-Math.PI / 2} scale={1.5} position={[7.25, -3.63, 7.5]}>
        <primitive object={windowglb.scene} />
      </mesh>
      {/* 커튼 */}
      <mesh
        rotation-y={-Math.PI / 2}
        scale={0.04}
        position={[3.81, -2.43, -2.55]}
      >
        <primitive object={curtainglb.scene} />
      </mesh>
    </>
  );
};

export default Window;
