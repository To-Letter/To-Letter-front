import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";


const NewLetter = () => {
  const LetterGlb = useLoader(GLTFLoader, "/models/letter.glb");
  const meshRef = useRef<THREE.Mesh>(null);

  const letterTexture = useLoader(
    THREE.TextureLoader,
    "/images/letterDummyTexture.png"
  );
  letterTexture.flipY = false;

  useEffect(() => {
    LetterGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log("letter", child)
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
      ref={meshRef}
      rotation-y={Math.PI / 2}
      scale={1.2}
      position={[-0.5, -1.97, -2.5]}
      castShadow
      receiveShadow
    >
      <primitive object={LetterGlb.scene} />
    </mesh>
  );
};

export default NewLetter;
