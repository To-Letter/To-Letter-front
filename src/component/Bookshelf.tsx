const Bookshelf = ({ position }: { position: [number, number, number] }) => {
  const shelfWidth = 1.5;
  const shelfHeight = 0.8;
  const shelfDepth = 0.8;
  const boardThickness = 0.05;

  return (
    <group position={position}>
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
