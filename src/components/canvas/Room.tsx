"use client"; // R3F 컴포넌트이므로 필수

import { Plane } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
import MetalRack from "./models/MetalRack";
import Photo from "./models/Photo";
import Window from "./models/Window";
import Bed from "./models/Bed";
import Drawer from "./models/Drawer";
import Lamp from "./models/Lamp";
import Books from "./models/Books";
import TrashBin from "./models/TrashBin";

interface WallProps {
  args:
    | [width: number, height: number]
    | [
        width: number,
        height: number,
        widthSegments?: number,
        heightSegments?: number
      ];
  rotation: [number, number, number];
  position: [number, number, number];
  color: string;
  receiveShadow: boolean;
  castShadow: boolean;
}

/**
 * 벽 컴포넌트
 * @param {[number, number, number]} args 벽의 크기와 분할 정보를 담는 배열
 *    - [width, height] 또는 [width, height, widthSegments?, heightSegments?] 형식
 *    - width: 벽의 너비
 *    - height: 벽의 높이
 *    - widthSegments?: (선택) 가로 방향 분할 수
 *    - heightSegments?: (선택) 세로 방향 분할 수
 * @property {[number, number, number]} rotation - 벽의 회전값 [x, y, z]
 * @property {[number, number, number]} position - 벽의 위치 [x, y, z]
 * @property {string} color - 벽의 색상 (hex 또는 색상명)
 * @property {boolean} receiveShadow - 그림자를 받을지 여부
 * @property {boolean} castShadow - 그림자를 생성할지 여부
 */
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

  /** 그림자 관리 */
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;

  /** 조명 관리 */
  useEffect(() => {
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

      {/* 쓰레기통 */}
      <TrashBin />

      {/* 게시물 */}
      <Photo
        position={[-1, 0.3, -3.95]}
        imageUrl="/images/photo1.jpg"
        popupText="업데이트를 기대해주세요!"
        popupId="photo1"
      />
      <Photo
        position={[1, 0.6, -3.95]}
        imageUrl="/images/photo2.jpg"
        popupText="업데이트를 기대해주세요!"
        popupId="photo2"
      />
      <Photo
        position={[0.5, -0.8, -3.95]}
        imageUrl="/images/photo3.jpg"
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
