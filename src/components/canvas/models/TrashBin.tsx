"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";

const TrashBin = () => {
  const router = useRouter();
  /** 의자 glb 모델 */
  const chairglb = useLoader(GLTFLoader, "/models/trashBin.glb");

  /** 쓰레기통 클릭 함수 */
  const onClickTrashBin = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/letterdelete");
    }
  };

  /** 쓰레기통 style 변경 */
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
      rotation-y={Math.PI / 2}
      scale={1}
      position={[2, -6.5, -1.3]}
      castShadow
      receiveShadow
      onClick={onClickTrashBin}
    >
      <primitive object={chairglb.scene} />
    </mesh>
  );
};

export default TrashBin;
