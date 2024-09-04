

import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { treePosition } from "../../constants/seasonTree";
import { seasonFile } from "../../constants/seasonTree";

const Spring = () => {
  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);

  console.log(seasonFile.spring)

  const treeglb = useLoader(GLTFLoader, seasonFile.spring.modelPath);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    seasonFile.spring.texturePath
  );
  woodTexture.flipY = false;


  useEffect(() => {
    console.log("나무 start:", treeglb);
  
    // treeglb.scene.traverse((child) => {
    //   if ((child as THREE.Mesh).isMesh) {
    //     const mesh = child as THREE.Mesh;
    //     console.log("나무:", child);
    //     mesh.material = new THREE.MeshStandardMaterial({
    //       color: seasonFile.spring.color,
    //       map: woodTexture,
    //     });
    //     mesh.castShadow = true;
    //     mesh.receiveShadow = true;
    //   }
    // });

    treeglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log("나무:", child, mesh.geometry.groups);

        // 나뭇가지와 잎의 UV 맵핑 범위를 설정
        const branchMaterial = new THREE.MeshStandardMaterial({
          color: "#a0763f546", // 나뭇가지 색상
          map: woodTexture,
        });

        const leafMaterial = new THREE.MeshStandardMaterial({
          color: seasonFile.spring.color, // 잎 색상 (예: 녹색)
        });

        // UV 맵핑을 사용하여 나뭇가지와 잎의 부분을 구분
        mesh.geometry.groups.forEach((group) => {
          if (group.materialIndex === 0) {
            mesh.material = branchMaterial;
          } else if (group.materialIndex === 1) {
            mesh.material = leafMaterial;
          }
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    //나무 복제
    setTreeClones(treePosition.map(() => {
      const clone = treeglb.scene.clone();
      return clone;
    }));

  }, [treeglb, woodTexture]);


  return (
    <>
    {treeClones.map((model, idx)=>(
      <group 
        key={`treeGroup${idx}`} 
        scale={seasonFile.spring.scale} 
        position={[treePosition[idx][0], treePosition[idx][1], treePosition[idx][2]]}>
        <primitive key={`treePrimitive${idx}`} object={model} />
      </group>
    ))}
    </>
  );
};

export default Spring;