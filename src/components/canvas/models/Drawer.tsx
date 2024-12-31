"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const Drawer = () => {
  /** 서랍 glb모델 */
  const drawerglb = useLoader(GLTFLoader, "/models/drawer.glb");

  /** 서랍 모델 style 변경 */
  useEffect(() => {
    // Node1이 원형 배경
    // Node2~6부터 서랍장
    // Node7~11부터 하단책 12~14까지 상단책
    const drawerNode = Array.from({ length: 5 }, (_, i) => `Node${i + 2}`);
    const drawerBookNode = Array.from({ length: 8 }, (_, i) => `Node${i + 7}`);

    drawerglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (drawerNode.includes(mesh.name)) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#7b5d54",
          });
        }
        if (mesh.name === "Node1" || drawerBookNode.includes(mesh.name)) {
          mesh.visible = false;
        }
      }
    });
  }, [drawerglb]);

  return (
    <>
      {/* 서랍 */}
      <mesh rotation-y={-Math.PI / 2} scale={5} position={[-8.5, -4.955, 4.5]}>
        <primitive object={drawerglb.scene} />
      </mesh>
    </>
  );
};

export default Drawer;
