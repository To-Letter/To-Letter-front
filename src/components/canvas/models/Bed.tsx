"use client";

import { ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import usePointerCursor from "@/hooks/usePointerCursor";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";

const Bed = () => {
  const router = useRouter();
  /** 커서 스타일 커스텀 훅 */
  const { handlePointerOver, handlePointerOut } = usePointerCursor();
  /* 침대 glb 모델 */
  const bedglb = useGLTFLoader("/models/bed.glb");
  /* 침대 ref */
  const bedRef = useRef<THREE.Mesh>(null);

  /** 침대 클릭 마이페이지 모달로 이동 */
  const onClickBed = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (
      axiosInterceptor.defaults.headers.common["Authorization"] !== undefined
    ) {
      router.push("/mypage/myinfo");
    }
  };

  /** 침대 모델 style 조정 */
  useEffect(() => {
    bedglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.name === "malm_frame") {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#352929" });
        }
        if (mesh.name === "malm_blanket_002") {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#402626" });
        }
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [bedglb]);

  return (
    <>
      {/* 침대 */}
      <mesh
        ref={bedRef}
        rotation-y={-Math.PI / 2}
        scale={0.04}
        position={[-11.59, -4.955, 0.241]}
        onClick={onClickBed}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={bedglb.scene} />
      </mesh>
    </>
  );
};

export default Bed;
