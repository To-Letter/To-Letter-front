import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import Calender from "./Calender";
import Bookshelf from "./Bookshelf";

const meshColors: { [key: string]: string } = {
  Plane_1: "invisible",
  Plane_2: "invisible",
  Circle_1: "#020202",
  Circle_2: "#020202",
  Circle004_1: "#552f2f",
  Circle004_2: "#000000",
  Circle004_3: "#000000",
  Circle004_4: "#ecdb59",
  Circle004_5: "#ffffff",
  Cylinder: "#545454",
  Cylinder001: "#545454",
};

const setMeshProperties = (mesh: THREE.Mesh, name: string) => {
  const color = meshColors[name];
  if (color) {
    if (color === "invisible") {
      mesh.visible = false; // 벽 부분 숨기기
    } else {
      mesh.material = new MeshStandardMaterial({ color }); // 색상 변경
    }
  } else {
    mesh.castShadow = true; // 그림자 생성
    mesh.receiveShadow = true; // 그림자 수신
  }
};

const Desk = () => {
  const deskglb = useLoader(GLTFLoader, "/models/desk.glb");
  const deskRef = useRef<THREE.Mesh>(null);
  const candleglb = useLoader(GLTFLoader, "/models/candle.glb");
  const candleRef = useRef<THREE.Mesh>(null);
  const pencilglb = useLoader(GLTFLoader, "/models/pencil_case.glb");
  const pencilRef = useRef<THREE.Mesh>(null);

  const woodTexture = useLoader(
    THREE.TextureLoader,
    "/texture/brown_wood_texture.jpg"
  );

  useEffect(() => {
    woodTexture.anisotropy = 16; // 애니소트로픽 필터링 적용
    deskglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new MeshStandardMaterial({
          color: "#DBB975",
          map: woodTexture,
        }); // 나무 색상으로 변경
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
    candleglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
    pencilglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        setMeshProperties(mesh, mesh.name);
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [deskglb, candleglb, pencilglb]);

  return (
    <group>
      <Calender />
      <Bookshelf position={[1, -1.83, -2.7]} />
      <mesh ref={deskRef} rotation-y={Math.PI} scale={5} position={[0, -5, -2]}>
        <primitive object={deskglb.scene} />
      </mesh>
      <mesh ref={candleRef} scale={0.035} position={[2.5, -2.1, -2.7]}>
        <primitive object={candleglb.scene} />
      </mesh>
      <mesh ref={pencilRef} scale={0.2} position={[1.8, -1.74, -2.7]}>
        <primitive object={pencilglb.scene} />
      </mesh>
    </group>
  );
};

export default Desk;
