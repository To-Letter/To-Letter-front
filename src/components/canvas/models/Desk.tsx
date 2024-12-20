"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree, ThreeEvent } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import Calender from "./Calender";
import Bookshelf from "./Bookshelf";
/* import NewLetter from "./NewLetter"; */
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";

/**
 * 연필통 3D 모델의 메쉬별 색상 매핑 객체
 * @param {string} name: color - mesh의 이름과 색상
 */
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

/**
 * 3D 모델의 메쉬별 색상 매핑
 * @param {THREE.Mesh} mesh - 색상을 변경할 메쉬
 * @param {string} name - 메쉬의 이름
 */
const setMeshProperties = (mesh: THREE.Mesh, name: string) => {
  const color = meshColors[name];
  if (color) {
    mesh.material = new MeshStandardMaterial({ color }); // 색상 변경
    mesh.castShadow = true; // 그림자 생성
    mesh.receiveShadow = true; // 그림자 수신
  }
};

const Desk = () => {
  const router = useRouter();
  const { gl } = useThree();
  /** 책상 glb모델 */
  const deskglb = useLoader(GLTFLoader, "/models/desk.glb");
  /** 연필통 glb모델 */
  const pencilglb = useLoader(GLTFLoader, "/models/pencil_case.glb");

  /*   const newLetterAlarm = useRecoilValue(newLetterAlarmState); */

  /** 책상과 연필 style 변경 */
  useEffect(() => {
    /*     console.log("newLetterAlarm", newLetterAlarm); */
    if (deskglb && deskglb.scene) {
      deskglb.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new MeshStandardMaterial({
            color: "#7b5d54",
          });
          mesh.castShadow = true;
          mesh.receiveShadow = true;
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
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        }
      });

      objectsToRemove.forEach((obj) => {
        if (obj.parent) {
          obj.parent.remove(obj);
        }
      });
    }
  }, [deskglb, pencilglb]);

  /** 마우스 커서 포인터로 변경 */
  const handlePointerOver = () => {
    gl.domElement.style.cursor = "pointer";
  };

  /** 마우스 커서 기본으로 변경 */
  const handlePointerOut = () => {
    gl.domElement.style.cursor = "auto";
  };

  /** 연필통 클릭 이벤트 */
  const onClickPencil = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      router.push("/letter/userconfirm");
    }
  };

  return (
    <group>
      {/* 캘린더 */}
      <Calender />

      {/* 책선반 */}
      <Bookshelf position={[1.1, -1.68, -2.7]} />

      {/**편지지 */}
      {/* {newLetterAlarm && <NewLetter />} */}

      {/* 책상 */}
      <mesh rotation-y={Math.PI} scale={5} position={[0, -5, -2]}>
        <primitive object={deskglb.scene} />
      </mesh>
      {/* 연필통 */}
      <mesh
        scale={0.2}
        position={[2.3, -1.74, -2.7]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClickPencil}
      >
        <primitive object={pencilglb.scene} />
      </mesh>
    </group>
  );
};

export default Desk;
