

import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, MeshStandardMaterial, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { treePosition } from "../../constants/seasonTree";
import { seasonFile } from "../../constants/seasonTree";


const meshColors: { [key: string]: string } = {
  //나무 가지
  yamaboushi_tan_6000_a_aut1_1: "#493414",
  // 나뭇잎 1
  yamaboushi_tan_6000_a_aut1_2: "#ff6100",
  // 나뭇잎 2
  yamaboushi_tan_6000_a_aut1_3: "#f86b0d",
  // 나뭇잎 3
  yamaboushi_tan_6000_a_aut1_4: "#ff9100",
};


const Autumn = () => {
  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);

  const treeglb = useLoader(GLTFLoader, seasonFile.autumn.modelPath);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    seasonFile.spring.texturePath
  );
  woodTexture.flipY = false;


  useEffect(() => {
  
    treeglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        let meshColor = meshColors[mesh.name]
        if(meshColor === "#493414") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: meshColor,
            map: woodTexture,
          });
        }else{
          mesh.material = new THREE.MeshStandardMaterial({
            color: meshColor,
          });
        }
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
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
        scale={seasonFile.autumn.scale} 
        position={[treePosition[idx][0], treePosition[idx][1], treePosition[idx][2]]}>
        <primitive key={`treePrimitive${idx}`} object={model} />
      </group>
    ))}
    </>
  );
};

export default Autumn;