import { Canvas } from "@react-three/fiber";
import Secen from "../component/Secen";
import { OrbitControls } from "@react-three/drei";

function Home() {
  return (
    <Canvas shadows>
      <Secen />
      <OrbitControls
        minPolarAngle={Math.PI / 2.5} // under
        maxPolarAngle={Math.PI - Math.PI / 2.5} // top
        minAzimuthAngle={-Math.PI / 4} // left
        maxAzimuthAngle={Math.PI / 4} // right
        enablePan={false} // Ctrl 키로 시점 이동 비활성화
        minDistance={3} // 최소 확대 거리
        maxDistance={3} // 최대 축소 거리
      />
    </Canvas>
  );
}

export default Home;
