"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { receiveLetterBoxModalState } from "../../recoil/letterPopupAtom";
import { useSetRecoilState } from "recoil";
import axiosInterceptor from "../../apis/axiosInterceptor";

interface BookSettings {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}

interface BookPage {
  position: [number, number, number];
  rotation: [number, number, number];
  args?: [number, number, number];
}

const Books = () => {
  // 모델 선언
  const booksglb = useLoader(GLTFLoader, "/models/books.glb");
  const booksRef = useRef<THREE.Mesh>(null);

  const setReceiveLetterBoxModal = useSetRecoilState(
    receiveLetterBoxModalState
  );

  useEffect(() => {
    // 40의 책중 쓸 노드
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

    // 서랍장 책들
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

    // 책 모델 조정
    booksglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
        if (!booksNode2.includes(mesh.name)) {
          mesh.position.set(9999, 9999, 9999);
          mesh.visible = true;
        } else {
          // 서랍장 밑 책 5권
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
        // 책꽂이 책 3권
        if (mesh.name === "Node35") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#4bafd4",
          });
          mesh.position.set(8, 39, 22.3); // 책 위치 조정 (x,z,-반전y)
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          // 클릭 이벤트 적용
          mesh.userData = { onClick: setReceiveLetterBoxModalClick };
        }
        if (mesh.name === "Node2") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#a25187",
          });
          mesh.position.set(5, -99, -32.4); // 책 위치 조정 (x,z,-반전y)
          mesh.rotation.y = Math.PI / 27.5;
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          // 클릭 이벤트 적용
          mesh.userData = { onClick: setReceiveLetterBoxModalClick };
        }
        if (mesh.name === "Node11") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#493c38",
          });
          mesh.position.set(9.7, -5.9, -32.85); // 책 위치 조정 (x,z,-반전y)
          mesh.rotation.z = -Math.PI / 2;
          mesh.scale.x = 0.7;
          mesh.scale.z = 0.7;
          // 클릭 이벤트 적용
          mesh.userData = { onClick: setReceiveLetterBoxModalClick };
        }
      }
    });
  }, [booksglb]);

  // 책속지
  const bookPages: BookPage[] = [
    { position: [0.44, -1.59, -2.665], rotation: [0, Math.PI / 2, 0] },
    { position: [0.525, -1.59, -2.665], rotation: [0, Math.PI / 2, 0] },
    {
      position: [0.665, -1.59, -2.665],
      rotation: [0, 0, Math.PI / 25],
      args: [0.05, 0.93, 0.725],
    },
  ];

  const setReceiveLetterBoxModalClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      console.log("로그인 되어있어요!");
      setReceiveLetterBoxModal(true);
    }
  };

  return (
    <>
      {/* 책 */}
      <mesh ref={booksRef} rotation-x={Math.PI / 2} scale={0.05}>
        <primitive object={booksglb.scene} />
      </mesh>
      {/* 책 속지 */}
      {bookPages.map((page, index) => (
        <mesh
          key={index}
          onClick={setReceiveLetterBoxModalClick}
          position={page.position}
          rotation={page.rotation}
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
