import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap, SpotLight, SpotLightHelper } from "three";
import { useHelper } from '@react-three/drei';

/**
 * SeasonBackground components props
 */
interface SeasonBackgroundProps {
  nowMonthValue: number;
}

/**
 * 계절 관련 연결 파일 경로를 담는 변수
 * @param name 구분 이름
 * @param objPath .obj확장자 models 경로
 * @param mtlPath .mtl확장자 재질 경로
 * @param scale 모델별 크기
 */
interface seasonFileI {
  name: string,
  objPath: string,
  mtlPath: string,
  scale: number
  color: string
}

const SeasonBackground = ({ nowMonthValue }: SeasonBackgroundProps) => {
  /**
   * 나무 노답
   */
  const seasonData = useRef<seasonFileI[]>([
    {
      name: "winter",
      objPath: "/models/winterTree.obj",
      mtlPath: "/texture/scenery/winterTree.mtl",
      scale: 0.008,
      color: "#433032"
    },
    {
      name: "spring",
      objPath: "/models/summerTree.obj",
      mtlPath: "/models/springTree.mtl",
      scale: 0.21,
      color: "#576403"
    },
    {
      name: "summer",
      objPath: "/models/summerTree.obj",
      mtlPath: "/models/summerTree.mtl",
      scale: 0.21,
      color: "#2a3f01"
    },
    {
      name: "autumn",
      objPath: "/models/summerTree.obj",
      mtlPath: "/models/autumnTree.mtl",
      scale: 0.21,
      color: "#925115"
    },
  ]);
  // 월에 따른 계절 결정 (예: 12, 1, 2월 = 겨울)
  const seasonIndex = useRef(Math.floor((nowMonthValue % 12) / 3));
  const currentSeason = useRef(seasonData.current[seasonIndex.current]); 


  // MTLLoader로 재질 로드
  const materials = useLoader(MTLLoader, currentSeason.current.mtlPath);
  // OBJLoader로 모델 로드 (재질 적용)
  const obj = useLoader(OBJLoader, currentSeason.current.objPath, (loader) => {
    loader.setMaterials(materials);
  });

  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);
  const treePosition = useRef<number[][]>([
    [40, -25, -6],
    [37, -23, -10],
    [35, -24, 5],
    [40, -27, 0],
    [40, -26, -19],
    [40, -25, 12],
    [45, -23, -8],
    [43, -24, -28],
    [44, -27, 2],
    [46, -26, -21],
    [42, -25, -25],
    [43, -23, -12],
    [41, -24, 3],
    [42, -27, -2],
    [44, -26, -17],
  ])

  const spotLightRef = useRef<SpotLight>(null);
  useHelper(spotLightRef, SpotLightHelper);

  useEffect(() => {
    materials.preload();
    console.log('Loaded materials:', obj);

    // 텍스쳐 씌우기
    if (obj) {
      obj.traverse((child) => {
        if (child instanceof Mesh) {
          const material = materials.materials[child.material.name];
          child.material = material ? material : new MeshStandardMaterial({ color: currentSeason.current.color });
        }
      });
    }
    //나무 복제
    setTreeClones(treePosition.current.map((pos) => {
      const clone = obj.clone();
      return clone;
    }));

    if (spotLightRef.current) {
      // SpotLight의 타겟을 첫 번째 나무 위치로 설정
      spotLightRef.current.target.position.set(40, -15, -10);
      spotLightRef.current.target.updateMatrixWorld();
    }

  }, [obj]);

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
      {treeClones.map((clone, index) => (
        <primitive key={index} object={clone} scale={[currentSeason.current.scale, currentSeason.current.scale, currentSeason.current.scale]} position={treePosition.current[index] as [number, number, number]}/>
      ))}
    </>
  );
};

export default SeasonBackground;