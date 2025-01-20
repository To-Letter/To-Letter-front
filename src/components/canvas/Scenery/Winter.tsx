"use client";

import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import * as THREE from "three";
import { treePosition } from "@/constants/seasonTree";
import { seasonFile } from "@/constants/seasonTree";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";

const Winter = () => {
  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);

  const treeglb = useGLTFLoader(seasonFile.winter.modelPath);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    seasonFile.winter.texturePath
  );
  woodTexture.flipY = false;

  useEffect(() => {
    treeglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: seasonFile.winter.color,
          map: woodTexture,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
          scale={seasonFile.winter.scale}
          position={[
            treePosition[idx][0],
            treePosition[idx][1],
            treePosition[idx][2],
          ]}
        >
          <primitive key={`treePrimitive${idx}`} object={model} />
        </group>
      ))}
    </>
  );
};

export default Winter;
