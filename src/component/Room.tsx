import { Plane } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MetalRack from "./MetalRack";
import Photo from "./Photo";

interface WallProps {
  args: number[];
  rotation: [number, number, number];
  position: [number, number, number];
  map: THREE.Texture | null;
  receiveShadow: boolean;
  castShadow: boolean;
}

const WallComponent: React.FC<WallProps> = ({
  args,
  rotation,
  position,
  map,
  receiveShadow,
  castShadow,
}) => (
  <Plane
    args={args}
    rotation={rotation}
    position={position}
    receiveShadow={receiveShadow}
    castShadow={castShadow}
  >
    <meshStandardMaterial map={map} side={THREE.DoubleSide} />
  </Plane>
);

const Room = () => {
  const { gl, scene } = useThree();
  const [woodTexture, setWoodTexture] = useState<THREE.Texture | null>(null);

  const windowglb = useLoader(GLTFLoader, "/models/window.glb");
  const windowRef = useRef<THREE.Mesh>(null);

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

    windowglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === "Box002" || mesh.name === "Box003") {
          // 유리 부분을 투명하게 설정
          mesh.material = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
          });
        } else {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#6F4F28" }); // 창틀 색상으로 변경
        }
      }
    });
  }, [scene, windowglb]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      {woodTexture && (
        <>
          <mesh
            ref={windowRef}
            rotation-y={-Math.PI / 2}
            scale={0.0025}
            position={[7.5, 0, -1]}
          >
            <primitive object={windowglb.scene} />
          </mesh>
          <Photo
            position={[-3, 0.3, -3.95]}
            imageUrl="/texture/Photo1.jpg"
            popupText="This is photo1"
          />
          <Photo
            position={[-1, 0.6, -3.95]}
            imageUrl="/texture/Photo2.jpg"
            popupText="This is photo2"
          />
          <Photo
            position={[-1.5, -0.8, -3.95]}
            imageUrl="/texture/Photo3.jpg"
            popupText="This is photo3"
          />
          <MetalRack width={10} height={5} position={[-2, 0, -4]} />
          <WallComponent // left wall
            args={[12, 10]}
            rotation={[0, Math.PI / 2, 0]}
            position={[-7.5, 0, 2]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // right wall (top part)
            args={[12, 3.06]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[7.5, 3.48, 2]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // right wall (bottom part)
            args={[12, 3.2]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[7.5, -3.4, 2]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // right wall (right part)
            args={[7.3, 3.76]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[7.5, 0.07, 4.35]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // right wall (left part)
            args={[1.32, 3.76]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[7.5, 0.07, -3.34]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // top wall
            args={[15, 12]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 5, 2]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // front wall
            args={[15, 10]}
            rotation={[0, 0, 0]}
            position={[0, 0, -4]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
          <WallComponent // under wall
            args={[15, 12]}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, -5, 2]}
            map={woodTexture}
            receiveShadow
            castShadow
          />
        </>
      )}
    </>
  );
};

export default Room;
