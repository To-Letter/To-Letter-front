import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

const Desk = () => {
  const deskglb = useLoader(GLTFLoader, "/models/desk.glb");
  const meshRef = useRef<THREE.Mesh>(null);
  console.log("desk : ", deskglb);

  useEffect(() => {
    deskglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new MeshStandardMaterial({ color: "#DBB975" }); // 나무 색상으로 변경
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [deskglb]);

  return (
    <mesh ref={meshRef} rotation-y={Math.PI} scale={5} position={[0, -5, -2]}>
      <primitive object={deskglb.scene} />
    </mesh>
  );
};

export default Desk;
