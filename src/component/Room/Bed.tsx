import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useSetRecoilState } from "recoil";
import { myPageModalState } from "../../recoil/myInfoAtom";
import sessionStorageService from "../../utils/sessionStorageService";

const Bed = () => {
  // 모델 선언
  const bedglb = useLoader(GLTFLoader, "/models/bed.glb");
  const bedRef = useRef<THREE.Mesh>(null);
  // 마이페이지 모달
  const setMyPageModalState = useSetRecoilState(myPageModalState)

  const onClickBed = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if(sessionStorageService.get("accessToken") !== null){
      setMyPageModalState(true);
    }
  }

  useEffect(() => {
    // 침대 모델 조정
    bedglb.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.name === "malm_frame") {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#352929" });
        }
        if (mesh.name === "malm_blanket_002") {
          mesh.material = new THREE.MeshStandardMaterial({ color: "#402626" });
        }
        mesh.castShadow = true; // 그림자 생성
        mesh.receiveShadow = true; // 그림자 수신
      }
    });
  }, [bedglb]);

  return (
    <>
      {/* 침대 */}
      <mesh
        ref={bedRef}
        rotation-y={-Math.PI / 2}
        scale={0.04}
        position={[-11.59, -4.955, 0.241]}
        onClick={onClickBed}
      >
        <primitive object={bedglb.scene} />
      </mesh>
    </>
  );
};

export default Bed;
