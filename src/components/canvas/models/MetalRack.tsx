"use client";

/** 메탈 랙 모델
 * @param {number} width 랙 너비
 * @param {number} height 랙 높이
 * @param {[number, number, number]} position 랙 위치
 */
const MetalRack = ({
  width,
  height,
  position,
}: {
  width: number;
  height: number;
  position: [number, number, number];
}) => {
  /** 랙 간격 */
  const gridSpacing = 0.25;
  /** 랙 두께 */
  const wireThickness = 0.02;
  /** 랙 배열 */
  const wires = [];

  /** 가로 랙 생성 */
  for (let i = -height; i <= height; i++) {
    wires.push(
      <mesh key={`h-${i}`} position={[0, i * gridSpacing, 0]}>
        <boxGeometry
          args={[width * gridSpacing * 2, wireThickness, wireThickness]}
        />
        <meshStandardMaterial color="black" />
      </mesh>
    );
  }

  /** 세로 랙 생성 */
  for (let i = -width; i <= width; i++) {
    wires.push(
      <mesh key={`v-${i}`} position={[i * gridSpacing, 0, 0]}>
        <boxGeometry
          args={[wireThickness, height * gridSpacing * 2, wireThickness]}
        />
        <meshStandardMaterial color="black" />
      </mesh>
    );
  }

  return <group position={position}>{wires}</group>;
};

export default MetalRack;
