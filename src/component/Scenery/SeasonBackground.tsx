

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Plane } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap, SpotLight, SpotLightHelper } from "three";
import { useHelper } from '@react-three/drei';
import * as THREE from "three";
import Winter from "./Winter";
import { seasonFile } from "../../constants/seasonTree";


/**
 * SeasonBackground components props
 */
interface SeasonBackgroundProps {
  nowMonthValue: number;
}

const SeasonBackground = ({ nowMonthValue }: SeasonBackgroundProps) => { 
  const [floorTexture, setFloorTexture] = useState<THREE.Texture | null>(null);

  // 월에 따른 계절 결정 (예: 12, 1, 2월 = 겨울)
  const seasonIndex = useMemo(()=>{
    let index = Math.floor((nowMonthValue % 12) / 3)
    if(index === 0) return "winter"
    else if(index === 1) return "spring"
    else if(index === 2) return "summer"
    else if(index === 3) return "autumn"
  },[, nowMonthValue]);


  const spotLightRef = useRef<SpotLight>(null);


  useHelper(spotLightRef, SpotLightHelper);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/texture/scenery/base.jpg`,
      (texture) => {
        console.log("바닥!", texture)
        setFloorTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );

    if (spotLightRef.current) {
      // SpotLight의 타겟을 첫 번째 나무 위치로 설정
      spotLightRef.current.target.position.set(40, -15, -10);
      spotLightRef.current.target.updateMatrixWorld();
    }

  }, []);

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={[0, -5, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1000}
        castShadow
      />
      {
        seasonIndex === "winter" && <Winter/>
      }
      <Plane
        args={[50, 75]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[50, -30, -60]}
      >
        {
          floorTexture && <meshStandardMaterial
          map={floorTexture}
          color={"#2a2e2a"}
          side={THREE.DoubleSide}
        />
        }
        
      </Plane>
    </>
  );
};

export default SeasonBackground;