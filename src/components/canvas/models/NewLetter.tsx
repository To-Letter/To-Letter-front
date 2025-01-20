"use client";

import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { newLetterAlarmState } from "@/store/recoil/letterAtom";

const NewLetter = () => {
  /** 새로운 편지 glb모델 */
  const LetterGlb = useGLTFLoader("/models/letter.glb");
  /** 새로운 편지함 path이동 */
  const router = useRouter();
  const setNewLetterState = useSetRecoilState(newLetterAlarmState);

  /** 편지 모델 텍스처 */
  const letterTexture = useLoader(
    THREE.TextureLoader,
    "/images/letterDummyTexture.png"
  );
  letterTexture.flipY = false;

  /** 새로운 편지 모델 style 변경 */
  useEffect(() => {
    LetterGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: "#DCD5C6",
          map: letterTexture,
        }); // 나무 색상으로 변경
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [LetterGlb, letterTexture]);

  return (
    <mesh
      rotation-y={Math.PI / 2}
      scale={1.2}
      position={[-0.5, -1.97, -2.5]}
      castShadow
      receiveShadow
      onClick={() => {
        setTimeout(() => setNewLetterState(false), 10000);
        router.push("/letter/newletter");
      }}
    >
      <primitive object={LetterGlb.scene} />
    </mesh>
  );
};

export default NewLetter;
