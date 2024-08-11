import { Plane } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect } from "react";

const Room = () => {
  const { gl, scene } = useThree();
  const [woodTexture, setWoodTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "/texture/Marble.jpg",
      (texture) => {
        setWoodTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );
  }, []);

  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;

  useEffect(() => {
    const pointLight1 = new THREE.PointLight(0xffffff, 100, 100);
    pointLight1.position.set(0, 4, 0);
    pointLight1.castShadow = true;
    pointLight1.receiveShadow = true;
    pointLight1.shadow.bias = -0.0001; // 그림자 세기 조절
    pointLight1.shadow.mapSize = new THREE.Vector2(2048, 2048);
    scene.add(pointLight1);

    const pointLightHelper1 = new THREE.PointLightHelper(pointLight1);
    scene.add(pointLightHelper1);
  }, [scene]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {woodTexture && (
        <>
          <Plane // left wall
            args={[15, 10]}
            rotation={[0, Math.PI / 2, 0]}
            position={[-10, 0, -3]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              map={woodTexture}
              side={THREE.DoubleSide}
            />
          </Plane>
          <Plane // right wall
            args={[15, 10]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[10, 0, -3]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              map={woodTexture}
              side={THREE.DoubleSide}
            />
          </Plane>
          <Plane // top wall
            args={[20, 15]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 5, -3]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              map={woodTexture}
              side={THREE.DoubleSide}
            />
          </Plane>
          <Plane // front wall
            args={[20, 10]}
            position={[0, 0, -10.5]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              map={woodTexture}
              side={THREE.DoubleSide}
            />
          </Plane>

          <Plane // under wall
            args={[20, 15]}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, -5, -3]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              map={woodTexture}
              side={THREE.DoubleSide}
            />
          </Plane>
        </>
      )}
    </>
  );
};

export default Room;
