import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

interface props {
  loginModalOpenHdr: () => void
}

const Chair = ({loginModalOpenHdr}: props) => {
  const chairglb = useLoader(GLTFLoader, "/models/chair.glb");
  const meshRef = useRef<THREE.Mesh>(null);
  console.log("chair : ", chairglb);

  useEffect(() => {
    chairglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new MeshStandardMaterial({
          color: "#DBB975",  
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
      onClick={loginModalOpenHdr}
    >
      <primitive object={chairglb.scene} />
    </mesh>
  );
};

export default Chair;