"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";
import usePointerCursor from "@/hooks/usePointerCursor";

/** 사진
 * @param {[number, number, number]} position 사진 위치
 * @param {string} imageUrl 사진 이미지 경로
 * @param {string} popupText 팝업 텍스트
 * @param {string} popupId 팝업 아이디
 */
const Photo = ({
  position,
  imageUrl,
  popupText,
  popupId,
}: {
  position: [number, number, number];
  imageUrl: string;
  popupText: string;
  popupId: string;
}) => {
  const router = useRouter();
  /** 커서 스타일 커스텀 훅 */
  const { handlePointerOver, handlePointerOut } = usePointerCursor();
  /** 사진 텍스처 */
  const texture = useLoader(TextureLoader, imageUrl);

  /** 사진 클릭 함수 */
  const onClickphoto = () => {
    const isLoggedIn =
      axiosInterceptor.defaults.headers.common["Authorization"] !== undefined;

    if (popupId === "photo1" && isLoggedIn) {
      router.push("/share");
    } else {
      router.push(`/photo?text=${encodeURIComponent(popupText)}`);
    }
  };

  return (
    <>
      <group position={position} rotation={[0, 0, 0]} onClick={onClickphoto}>
        {/* Photo */}
        <mesh
          castShadow
          receiveShadow
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[0.6, 0.8]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0, -0.03]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </>
  );
};

export default Photo;
