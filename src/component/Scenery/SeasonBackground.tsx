

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";import React, { useRef, useEffect, useState, useMemo } from "react";
import { Plane } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap, SpotLight, SpotLightHelper } from "three";
import { useHelper } from '@react-three/drei';
import * as THREE from "three";
import Winter from "./Winter";
import { grassPosition, seasonFile } from "../../constants/seasonTree";
import Spring from "./Spring";
import Summer from "./Summer";
import Autumn from "./Autumn";


/**
 * SeasonBackground components props
 */
interface SeasonBackgroundProps {
  nowMonthValue: number;
}

const SeasonBackground = ({ nowMonthValue }: SeasonBackgroundProps) => { 
  const groundGlb = useLoader(GLTFLoader, "/models/ground.glb");
  const grassGlb = useLoader(GLTFLoader, "/models/grass.glb");
  const groundTexture = useLoader(THREE.TextureLoader, `/texture/scenery/base.jpg`);
  const [grassClones, setGrassClones] = useState<Group<Object3DEventMap>[]>([]);
  const meshRef = useRef<THREE.Mesh>(null);

  // 월에 따른 계절 결정 (예: 12, 1, 2월 = 겨울)
  const seasonIndex = useMemo(()=>{
    let index = Math.floor((nowMonthValue % 12) / 3)
    if(index === 0) return "winter"
    else if(index === 1) return "spring"
    else if(index === 2) return "summer"
    else return "autumn"
  },[, nowMonthValue]);


  const spotLightRef = useRef<SpotLight>(null);


  useHelper(spotLightRef, SpotLightHelper);

  useEffect(() => {
    groundGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: seasonFile[seasonIndex].floorColor,
          map: groundTexture
        }); 
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });

    grassGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: seasonFile[seasonIndex].floorColor,
          map: groundTexture
        }); 
        if(mesh.name === "grass_2"){
          mesh.visible=false;
        }else{
          mesh.castShadow = true; // 그림자 생성
          mesh.receiveShadow = true; // 그림자 수신
        }
      }
    });

    if (spotLightRef.current) {
      // SpotLight의 타겟을 첫 번째 나무 위치로 설정
      spotLightRef.current.target.position.set(40, -15, -10);
      spotLightRef.current.target.updateMatrixWorld();
    }

    //바닥 풀 복제
    setGrassClones(grassPosition.map(() => {
      const clone = grassGlb.scene.clone();
      return clone;
    }));


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
      {seasonIndex === "winter" && <Winter/>}
      {seasonIndex === "spring" && <Spring/>}
      {seasonIndex === "summer" && <Summer/>}
      {seasonIndex === "autumn" && <Autumn/>}


      {
        grassClones.map((model, idx)=>(
          <mesh
          key={`grass${idx}`}
          scale={0.015}
          position={[grassPosition[idx][0], grassPosition[idx][1], grassPosition[idx][2]]}
          castShadow
          receiveShadow
          >
            <primitive object={model} />
          </mesh>
        ))
      }
      
      <mesh
      ref={meshRef}
      scale={0.5}
      position={[20, -38, -60]}
      castShadow
      receiveShadow
      >
        <primitive args={[50, 75]} object={groundGlb.scene} />
      </mesh>
    </>
  );
};

export default SeasonBackground;