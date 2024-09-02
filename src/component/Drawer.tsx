import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const Drawer = () => {
  // 모델 선언
  const drawerglb = useLoader(GLTFLoader, "/models/drawer.glb");
  const drawerRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Node1이 원형 배경
    // Node2~6부터 서랍장
    // Node7~11부터 하단책 12~14까지 상단책
    const drawerNode = Array.from({ length: 5 }, (_, i) => `Node${i + 2}`);
    const drawerBookNode = Array.from({ length: 8 }, (_, i) => `Node${i + 7}`);

    // 서랍 모델 조정
    drawerglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
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
      <mesh
        ref={drawerRef}
        rotation-y={-Math.PI / 2}
        scale={5}
        position={[-8.5, -4.955, 4.5]}
      >
        <primitive object={drawerglb.scene} />
      </mesh>
    </>
  );
};

export default Drawer;
