"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import usePointerCursor from "@/hooks/usePointerCursor";
import { useGLTFLoader } from "@/hooks/useGLTFLoader";

/**
 * 책의 설정값을 정의하는 인터페이스
 * @interface BookSettings
 * @property {string} color - 책의 색상 값
 * @property {[number, number, number]} position - 3D 공간에서의 책 위치 (x, y, z)
 * @property {[number, number, number]} rotation - 책의 회전 각도 (x, y, z)
 * @property {[number, number, number]} [scale] - 책의 크기 배율 (선택적)
 */
interface BookSettings {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}

/**
 * 책 속지의 설정값을 정의하는 인터페이스
 * @interface BookPage
 * @property {number} position - 3D 공간에서의 책 위치 (x, y, z)
 * @property {number} rotation - 책의 회전 각도 (x, y, z)
 * @property {number} args - 책 속지의 크기 (선택적)
 */
interface BookPage {
  position: [number, number, number];
  rotation: [number, number, number];
  args?: [number, number, number];
}

const Books = () => {
  const router = useRouter();
  /** 커서 스타일 커스텀 훅 */
  const { handlePointerOver, handlePointerOut } = usePointerCursor();
  /* 책 glb 모델 */
  const booksglb = useGLTFLoader("/models/books.glb");
  /* 책 ref */
  const booksRef = useRef<THREE.Mesh>(null);

  /** 책 클릭 시 편지함 모달로 이동 */
  const onClickBooks = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
        router.push("/letter/letterbox/receive");
      }
    },
    [router]
  );

  /** 책 모델 style 조정 */
  useEffect(() => {
    /* 40개의 책중 쓸 노드 */
    const booksNode2 = [
      "Node2",
      "Node10",
      "Node11",
      "Node20",
      "Node25",
      "Node26",
      "Node35",
      "Node37",
    ];
    /* 서랍장 책들 setting */
    const bookSettings: { [key: string]: BookSettings } = {
      Node20: {
        color: "#383959",
        position: [-50, -200, 95],
        rotation: [Math.PI / 2, -Math.PI / 2, 0],
      },
      Node26: {
        color: "#cdd37f",
        position: [-50, -46, 90],
        rotation: [Math.PI / 2, -Math.PI / 2, 0],
      },
      Node37: {
        color: "#438e42",
        position: [-53, 100, 87],
        rotation: [Math.PI / 2, -Math.PI / 2, 0],
      },
      Node10: {
        color: "#ee8953",
        position: [-136, -177, 82.5],
        rotation: [Math.PI / 2, -Math.PI / 2, 0],
      },
      Node25: {
        color: "#d45871",
        position: [-142, -46, 80.8],
        rotation: [Math.PI / 2, -Math.PI / 2, 0],
      },
    };

    /* 책 모델 조정 */
    booksglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (!booksNode2.includes(mesh.name)) {
          mesh.position.set(9999, 9999, 9999);
          mesh.visible = true;
        } else {
          /* 서랍장 밑 책 5권 setting */
          const settings = bookSettings[mesh.name];
          if (settings) {
            mesh.material = new THREE.MeshStandardMaterial({
              color: settings.color,
            });
            mesh.position.set(...settings.position);
            mesh.rotation.y = settings.rotation[0];
            mesh.rotation.x = settings.rotation[1];
            if (settings.scale) {
              mesh.scale.set(...settings.scale);
            }
          }
        }
        /* 책꽂이 책 3권 setting */
        if (mesh.name === "Node35") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#4bafd4",
          });
          mesh.position.set(8, 39, 22.3);
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          mesh.userData = { onClick: onClickBooks };
        }
        if (mesh.name === "Node2") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#a25187",
          });
          mesh.position.set(5, -99, -32.4);
          mesh.rotation.y = Math.PI / 27.5;
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          mesh.userData = { onClick: onClickBooks };
        }
        if (mesh.name === "Node11") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#493c38",
          });
          mesh.position.set(9.7, -5.9, -32.85);
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          mesh.userData = { onClick: onClickBooks };
        }
      }
    });
  }, [booksglb, onClickBooks]);

  /** 책속지 setting */
  const bookPages: BookPage[] = [
    { position: [0.44, -1.59, -2.665], rotation: [0, Math.PI / 2, 0] },
    { position: [0.525, -1.59, -2.665], rotation: [0, Math.PI / 2, 0] },
    {
      position: [0.665, -1.59, -2.665],
      rotation: [0, 0, Math.PI / 25],
      args: [0.05, 0.93, 0.725],
    },
  ];

  return (
    <>
      {/* 책 */}
      <mesh
        ref={booksRef}
        rotation-x={Math.PI / 2}
        scale={0.05}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={booksglb.scene} />
      </mesh>
      {/* 책 속지 */}
      {bookPages.map((page, index) => (
        <mesh
          key={index}
          onClick={onClickBooks}
          position={page.position}
          rotation={page.rotation}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        >
          <boxGeometry args={page.args || [0.73, 0.93, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </>
  );
};

export default Books;
