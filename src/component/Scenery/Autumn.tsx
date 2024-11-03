import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Group, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import { seasonFile } from "../../constants/seasonTree";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/loadingAtom";

// 메쉬 색상 설정
const meshColors: { [key: string]: string } = {
  1: "#493414",
  2: "#ff9100",
  3: "#f86b0d",
  4: "#ff6100",
};

const Autumn = () => {
  const { scene } = useThree();
  const [treeModel, setTreeModel] = useState<Group | null>(null);
  const isLoading = useSetRecoilState(loadingState)

  const woodTexture = new THREE.TextureLoader().load(
    seasonFile.spring.texturePath,
    (texture) => (texture.flipY = false)
  );

  useEffect(() => {

    // GLTFLoader 및 DRACOLoader 설정
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // 경로를 실제 디코더 파일 경로로 설정
    loader.setDRACOLoader(dracoLoader);

    if(treeModel===null){
      isLoading(true);
    }
    loader.load(
      seasonFile.autumn.modelPath,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const parts = mesh.name.split("_");
            const meshNumber = parseInt(parts[parts.length - 1], 10);
            const meshColor = meshColors[meshNumber];

            if (meshColor) {
              if (meshColor === "#493414") {
                mesh.material = new MeshStandardMaterial({
                  color: meshColor,
                  map: woodTexture,
                });
              } else {
                mesh.material = new MeshStandardMaterial({
                  color: meshColor,
                });
              }
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          }
        });
        isLoading(false);
        setTreeModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );
  }, [woodTexture]);

  return (
    <>
      {treeModel && (
        <group scale={seasonFile.autumn.scale} position={[37, -25, -66]}>
          <primitive object={treeModel} />
        </group>
      )}
    </>
  );
};

export default Autumn;
