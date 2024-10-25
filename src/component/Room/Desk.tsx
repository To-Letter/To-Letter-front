import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree, ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import Calender from "./Calender";
import Bookshelf from "./Bookshelf";
import { Html } from "@react-three/drei";
import LetterPopup from "./LetterPopup";

// 연필통 색상 수정
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
    mesh.material = new MeshStandardMaterial({ color }); // 색상 변경
    mesh.castShadow = true; // 그림자 생성
    mesh.receiveShadow = true; // 그림자 수신
  }
};

const Desk = () => {
  // 모델 선언
  const deskglb = useLoader(GLTFLoader, "/models/desk.glb");
  const pencilglb = useLoader(GLTFLoader, "/models/pencil_case.glb");
  const deskRef = useRef<THREE.Mesh>(null);
  const pencilRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const [showPopup, setShowPopup] = useState(false);

  // 모델 수정
  useEffect(() => {
    if (deskglb && deskglb.scene) {
      deskglb.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new MeshStandardMaterial({
            color: "#7b5d54",
          }); // 나무 색상으로 변경
          mesh.castShadow = true; // 그림자 생성
          mesh.receiveShadow = true; // 그림자 수신
        }
      });
    }

    if (pencilglb && pencilglb.scene) {
      const meshesToRemove = ["Plane_1", "Plane_2"];
      const objectsToRemove: THREE.Object3D[] = [];

      pencilglb.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (meshesToRemove.includes(mesh.name)) {
            objectsToRemove.push(mesh);
          } else {
            setMeshProperties(mesh, mesh.name);
            mesh.castShadow = true; // 그림자 생성
            mesh.receiveShadow = true; // 그림자 수신
          }
        }
      });

      objectsToRemove.forEach((obj) => {
        if (obj.parent) {
          obj.parent.remove(obj); // Plane_1과 Plane_2 삭제
        }
      });
    }
  }, [deskglb, pencilglb]);

  const handlePointerOver = (event: ThreeEvent<MouseEvent>) => {
    gl.domElement.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<MouseEvent>) => {
    gl.domElement.style.cursor = "auto";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setShowPopup(true);
  };

  return (
    <group>
      {/* 캘린더 */}
      <Calender />

      {/* 책선반 */}
      <Bookshelf position={[1.1, -1.68, -2.7]} />

      {/* 책상 */}
      <mesh ref={deskRef} rotation-y={Math.PI} scale={5} position={[0, -5, -2]}>
        <primitive object={deskglb.scene} />
      </mesh>
      {/* 연필통 */}
      <mesh
        ref={pencilRef}
        scale={0.2}
        position={[2.3, -1.74, -2.7]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <primitive object={pencilglb.scene} />
      </mesh>
      {showPopup && (
        <Html center>
          <LetterPopup onClose={() => setShowPopup(false)} senderName="Test" />
        </Html>
      )}
    </group>
  );
};

export default Desk;
