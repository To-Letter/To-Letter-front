"use client";

import { Plane } from "@react-three/drei";
import { useEffect, useState, useMemo } from "react";
import * as THREE from "three";

const Cloud = ({ nowHoursValue }: { nowHoursValue: number }) => {
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);
  const timeZone: string = useMemo((): string => {
    if (nowHoursValue > 5 && nowHoursValue < 20) {
      // 새벽 5시 이후, 저녁 8시 이전 => 해 떠있을 때
      return `/images/scenery/noonCloud.png`;
    } else {
      return `/images/scenery/nightCloud.png`;
    }
  }, [nowHoursValue]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      timeZone,
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

export default Cloud;
