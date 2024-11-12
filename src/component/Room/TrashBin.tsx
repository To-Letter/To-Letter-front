import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useSetRecoilState } from "recoil";
import { accountModalState } from "../../recoil/accountAtom";


const TrashBin = () => {
  const chairglb = useLoader(GLTFLoader, "/models/trashBin.glb");
  const meshRef = useRef<THREE.Mesh>(null);
  const setModalState= useSetRecoilState(accountModalState); 

  useEffect(() => {
    chairglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: "#41271f",
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
      scale={1}
      position={[2, -6.5, -1]}
      castShadow
      receiveShadow
    >
      <primitive object={chairglb.scene} />
    </mesh>
  );
};

export default TrashBin;
