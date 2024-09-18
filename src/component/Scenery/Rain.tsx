
import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { rainPosition, rainRotation, rainScale } from "../../constants/seasonTree";

const Rain = () => {
  const rainGlb = useLoader(GLTFLoader, "/models/cloud.glb");
  const [rainClones, setCloudClones] = useState<Group<Object3DEventMap>[]>([]);

  useEffect(() => {
    rainGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#9c9c9c",
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    setCloudClones(rainPosition.map(() => {
      const clone = rainGlb.scene.clone();
      return clone;
    }));

  }, [rainGlb]);

  return (
    <>
    {rainClones.map((model, idx)=>(
      <group 
        key={`rainGroup${idx}`} 
        rotation={[rainRotation[idx][0], rainRotation[idx][1], rainRotation[idx][2]]}
        scale={rainScale[idx]} 
        position={[rainPosition[idx][0], rainPosition[idx][1], rainPosition[idx][2]]}>
        <primitive key={`rainPrimitive${idx}`} object={model} />
      </group>
    ))}
    </>
  );
};

export default Rain;