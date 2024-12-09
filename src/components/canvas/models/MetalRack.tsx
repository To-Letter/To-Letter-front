"use client";

const MetalRack = ({
  width,
  height,
  position,
}: {
  width: number;
  height: number;
  position: [number, number, number];
}) => {
  const gridSpacing = 0.25;
  const wireThickness = 0.02;

  const wires = [];

  for (let i = -height; i <= height; i++) {
    // Horizontal wires
    wires.push(
      <mesh key={`h-${i}`} position={[0, i * gridSpacing, 0]}>
        <boxGeometry
          args={[width * gridSpacing * 2, wireThickness, wireThickness]}
        />
        <meshStandardMaterial color="black" />
      </mesh>
    );
  }

  for (let i = -width; i <= width; i++) {
    // Vertical wires
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
