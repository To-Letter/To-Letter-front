"use client";

import { useEffect } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import Calender from "./Calender";
import Bookshelf from "./Bookshelf";
/* import NewLetter from "./NewLetter"; */
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";
import usePointerCursor from "@/hooks/usePointerCursor";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";
import { ThreeEvent } from "@react-three/fiber";
import { newLetterAlarmState } from "@/store/recoil/letterAtom";
import { useRecoilValue } from "recoil";
import NewLetter from "./NewLetter";

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
  /** 커서 스타일 커스텀 훅 */
  const { handlePointerOver, handlePointerOut } = usePointerCursor();
  /** 책상 glb모델 */
  const deskglb = useGLTFLoader("/models/desk.glb");
  /** 연필통 glb모델 */
  const pencilglb = useGLTFLoader("/models/pencil_case.glb");
  /** 새로운 편지 알람 상태 */
  const newLetterAlarm = useRecoilValue(newLetterAlarmState);
  const isAuthorized =
    axiosInterceptor.defaults.headers.common["Authorization"] !== undefined;

  /** 책상과 연필 style 변경 */
  useEffect(() => {
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

  /** 연필통 클릭 이벤트 */
  const onClickPencil = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (
      axiosInterceptor.defaults.headers.common["Authorization"] !== undefined
    ) {
      router.push("/letter/userconfirm");
    }
  };

  return (
    <group>
      {/* 캘린더 */}
      <Calender />

      {/* 책선반 */}
      <Bookshelf
        position={[1.1, -1.68, -2.7]}
        handlePointerOver={handlePointerOver}
        handlePointerOut={handlePointerOut}
      />

      {/**편지 도착 */}
      {newLetterAlarm && isAuthorized && <NewLetter />}

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
