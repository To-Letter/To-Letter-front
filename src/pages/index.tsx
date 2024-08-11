import { Canvas } from "@react-three/fiber";
import Secen from "../component/Secen";
import { OrbitControls } from "@react-three/drei";

function Home() {
  return (
    <Canvas shadows>
      <Secen />
      <OrbitControls />
    </Canvas>
  );
}

export default Home;