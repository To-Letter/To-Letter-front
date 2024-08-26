import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Bookshelf = ({ position }: { position: [number, number, number] }) => {
  const shelfWidth = 1;
  const shelfHeight = 0.5;
  const shelfDepth = 0.5;
  const boardThickness = 0.05;

  const woodTexture = useLoader(
    THREE.TextureLoader,
    "/texture/brown_wood_texture.jpg"
  );

  return (
    <group position={position}>
      {/* Bottom Board */}
      <mesh position={[0, -shelfHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, boardThickness, shelfDepth]} />
        <meshStandardMaterial map={woodTexture} color={"#DBB975"} />
      </mesh>
      {/* Left Board */}
      <mesh
        position={[-shelfWidth / 2 + boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial map={woodTexture} color={"#DBB975"} />
      </mesh>
      {/* Right Board */}
      <mesh
        position={[shelfWidth / 2 - boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial map={woodTexture} color={"#DBB975"} />
      </mesh>
      {/* Back Board */}
      <mesh
        position={[0, 0, -shelfDepth / 2 + boardThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[shelfWidth, shelfHeight, boardThickness]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>
    </group>
  );
};

export default Bookshelf;
