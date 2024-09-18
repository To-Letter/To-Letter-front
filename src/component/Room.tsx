import { Plane } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
import MetalRack from "./MetalRack";
import Photo from "./Photo";
import Window from "./Window";
import Bed from "./Bed";
import Drawer from "./Drawer";
import Lamp from "./Lamp";
import Books from "./Books";

// 타입 지정
interface WallProps {
  args: number[];
  rotation: [number, number, number];
  position: [number, number, number];
  color: string;
  receiveShadow: boolean;
  castShadow: boolean;
}

const WallComponent: React.FC<WallProps> = ({
  args,
  rotation,
  position,
  color,
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
    <meshStandardMaterial color={color} side={THREE.DoubleSide} />
  </Plane>
);

const Room = () => {
  const { gl, scene } = useThree();

  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;

  useEffect(() => {
    // 조명 관리
    const pointLight1 = new THREE.PointLight(0xffffff, 100, 100);
    pointLight1.position.set(0, 4, 0);
    pointLight1.castShadow = true;
    pointLight1.receiveShadow = true;
    pointLight1.shadow.bias = -0.0001; // 그림자 세기 조절
    pointLight1.shadow.mapSize = new THREE.Vector2(2048, 2048);
    scene.add(pointLight1);
  }, [scene]);

  return (
    <>
      {/* 조명 추가 */}
      <ambientLight />

      {/* 카메라 */}
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />

      {/* 창문 */}
      <Window />

      {/* 게시판 */}
      <MetalRack width={10} height={5} position={[0, 0, -4]} />

      {/* 침대 */}
      <Bed />

      {/* 서랍 */}
      <Drawer />

      {/* 램프 */}
      <Lamp />

      {/* 책 */}
      <Books />

      {/* 게시물 */}
      <Photo
        position={[-1, 0.3, -3.95]}
        imageUrl="/images/Photo1.jpg"
        popupText="업데이트를 기대해주세요!"
        popupId="photo1"
      />
      <Photo
        position={[1, 0.6, -3.95]}
        imageUrl="/images/Photo2.jpg"
        popupText="업데이트를 기대해주세요!"
        popupId="photo2"
      />
      <Photo
        position={[0.5, -0.8, -3.95]}
        imageUrl="/images/Photo3.jpg"
        popupText="업데이트를 기대해주세요!"
        popupId="photo3"
      />

      {/* 벽 */}
      <WallComponent // left wall
        args={[12, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-15, 0, 2]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // right wall (top part)
        args={[12, 3.11]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, 3.45, 2]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // right wall (bottom part)
        args={[12, 3.3]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, -3.4, 2]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // right wall (right part)
        args={[5.9, 3.76]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, 0.07, 5.06]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // right wall (left part)
        args={[1.07, 3.76]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, 0.07, -3.47]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // top wall
        args={[19, 12]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-5.5, 5, 2]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // front wall
        args={[19, 10]}
        rotation={[0, 0, 0]}
        position={[-5.5, 0, -4]}
        color={"#cbb1a0"}
        receiveShadow
        castShadow
      />
      <WallComponent // under wall
        args={[19, 12]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-5.5, -5, 2]}
        color={"#7b5d54"}
        receiveShadow
        castShadow
      />
    </>
  );
};

export default Room;
