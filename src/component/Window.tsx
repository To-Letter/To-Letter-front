import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const Window = () => {
  // 모델 선언
  const windowglb = useLoader(GLTFLoader, "/models/window.glb");
  const windowRef = useRef<THREE.Mesh>(null);

  const curtainglb = useLoader(GLTFLoader, "/models/curtain.glb");
  const curtainRef = useRef<THREE.Mesh>(null);

  // 창문 texture
  const curtainTexture = useLoader(
    THREE.TextureLoader,
    "/texture/curtain_texture.jpg"
  );

  useEffect(() => {
    // 창문 모델 조정
    windowglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === "Object001") {
          // 유리 부분을 투명하게 설정
          mesh.material = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
          });
        } else {
          // 창틀 색상 변경
          mesh.material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
        }
      }
    });
    // 커튼 모델 조정
    curtainglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          //   map: curtainTexture,
          color: "#7b5d54",
        });
        if (
          mesh.name === "Plane011" ||
          mesh.name === "Plane012" ||
          mesh.name === "Line007" ||
          mesh.name === "Line008" ||
          mesh.name === "Box003" ||
          mesh.name === "Box004"
        ) {
          mesh.visible = false;
        }
      }
    });
  }, [windowglb, curtainglb, curtainTexture]);

  return (
    <>
      {/* 창문 */}
      <mesh
        ref={windowRef}
        rotation-y={-Math.PI / 2}
        scale={1.5}
        position={[7.25, -3.63, 7.5]}
      >
        <primitive object={windowglb.scene} />
      </mesh>
      {/* 커튼 */}
      <mesh
        ref={curtainRef}
        rotation-y={-Math.PI / 2}
        scale={0.04}
        position={[3.81, -2.43, -2.55]}
      >
        <primitive object={curtainglb.scene} />
      </mesh>
    </>
  );
};

export default Window;
