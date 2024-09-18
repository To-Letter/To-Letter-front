
import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { cloudPosition, cloudRotation, cloudScale } from "../../constants/seasonTree";

const Cloud = () => {
  const cloudGlb = useLoader(GLTFLoader, "/models/cloud.glb");
  const [cloudClones, setCloudClones] = useState<Group<Object3DEventMap>[]>([]);

  useEffect(() => {
    cloudGlb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#b6b6b6",
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    setCloudClones(cloudPosition.map(() => {
      const clone = cloudGlb.scene.clone();
      return clone;
    }));

  }, [cloudGlb]);

  return (
    <>
    {cloudClones.map((model, idx)=>(
      <group 
        key={`cloudGroup${idx}`} 
        rotation={[cloudRotation[idx][0], cloudRotation[idx][1], cloudRotation[idx][2]]}
        scale={cloudScale[idx]} 
        position={[cloudPosition[idx][0], cloudPosition[idx][1], cloudPosition[idx][2]]}>
        <primitive key={`cloudPrimitive${idx}`} object={model} />
      </group>
    ))}
    </>
  );
};

export default Cloud;