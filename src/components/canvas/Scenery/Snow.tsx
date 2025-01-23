"use client";

import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import * as THREE from "three";
import { treePosition } from "@/constants/seasonTree";
import { seasonFile } from "@/constants/seasonTree";
import { Plane } from "@react-three/drei";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";

const meshColors: { [key: string]: string } = {
  //나무 가지
  yamaboushi_tan_6000_a_aut1_1: "#493414",
  // 나뭇잎 1
  yamaboushi_tan_6000_a_aut1_2: "#ffffff",
  // 나뭇잎 2
  yamaboushi_tan_6000_a_aut1_3: "#493818",
  // 나뭇잎 3
  yamaboushi_tan_6000_a_aut1_4: "unvi",
};

const Winter = () => {
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);
  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);

  const treeglb = useGLTFLoader(seasonFile.spring.modelPath);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    seasonFile.spring.texturePath
  );
  woodTexture.flipY = false;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/images/scenery/snow.png`,
      (texture) => {
        setBgTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );

    treeglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshColor = meshColors[mesh.name];
        if (meshColor === "#493414") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: meshColor,
            map: woodTexture,
          });
        } else if (meshColor === "unvi") {
          mesh.visible = false;
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: meshColor,
          });
        }
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });

    //나무 복제
    setTreeClones(
      treePosition.map(() => {
        const clone = treeglb.scene.clone();
        return clone;
      })
    );
  }, [treeglb, woodTexture]);

  return (
    <>
      {treeClones.map((model, idx) => (
        <group
          key={`treeGroup${idx}`}
          scale={seasonFile.spring.scale}
          position={[
            treePosition[idx][0],
            treePosition[idx][1],
            treePosition[idx][2],
          ]}
        >
          <primitive key={`treePrimitive${idx}`} object={model} />
        </group>
      ))}
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

export default Winter;
