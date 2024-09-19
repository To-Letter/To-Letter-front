

import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { treePosition } from "../../constants/seasonTree";
import { seasonFile } from "../../constants/seasonTree";

const Winter = () => {
  const [treeClones, setTreeClones] = useState<Group<Object3DEventMap>[]>([]);

  console.log(seasonFile.winter)

  const treeglb = useLoader(GLTFLoader, seasonFile.winter.modelPath);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    seasonFile.winter.texturePath
  );
  woodTexture.flipY = false;


  useEffect(() => {
    console.log("나무 start:", woodTexture);
  
    treeglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log("나무:", child);
        mesh.material = new THREE.MeshStandardMaterial({
          color: seasonFile.winter.color,
          map: woodTexture,
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
        scale={seasonFile.winter.scale} 
        position={[treePosition[idx][0], treePosition[idx][1], treePosition[idx][2]]}>
        <primitive key={`treePrimitive${idx}`} object={model} />
      </group>
    ))}
    </>
  );
};

export default Winter;