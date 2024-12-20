"use client";

import { ThreeEvent } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

/**
 * 3D 책장 컴포넌트
 * @param position [x, y, z] 좌표로 표현되는 책장의 위치
 * @returns 책 선반 그룹
 */
const Bookshelf = ({ position }: { position: [number, number, number] }) => {
  const router = useRouter();
  /* 책 선반 사이즈 */
  const shelfWidth = 1.5;
  const shelfHeight = 0.8;
  const shelfDepth = 0.8;
  const boardThickness = 0.05;

  /** 책 선반 클릭 시 편지함 모달로 이동 */
  const onClickBookshelf = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/mailbox");
    }
  };

  return (
    <group position={position} onClick={onClickBookshelf}>
      {/* Bottom Board */}
      <mesh position={[0, -shelfHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, boardThickness, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Left Board */}
      <mesh
        position={[-shelfWidth / 2 + boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Right Board */}
      <mesh
        position={[shelfWidth / 2 - boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Back Board */}
      <mesh
        position={[0, 0, -shelfDepth / 2 + boardThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[shelfWidth, shelfHeight, boardThickness]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
    </group>
  );
};

export default Bookshelf;
