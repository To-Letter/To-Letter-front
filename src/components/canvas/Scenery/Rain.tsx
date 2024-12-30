"use client";

import { Plane } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const Rain = () => {
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/images/scenery/rain.png`,
      (texture) => {
        setBgTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );
  }, []);

  return (
    <>
      {bgTexture && (
        <>
          <Plane
            args={[400, 75]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[149, 0, -75]}
          >
            <meshStandardMaterial
              map={bgTexture}
              side={THREE.DoubleSide}
              transparent={true} // 투명도 활성화
              alphaTest={0.0001}
            />
          </Plane>
        </>
      )}
    </>
  );
};

export default Rain;
