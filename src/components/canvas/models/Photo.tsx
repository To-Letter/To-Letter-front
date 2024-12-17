"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Popup from "./Popup";
import axiosInterceptor from "@/lib/api/axiosInterceptor";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const texture = useLoader(TextureLoader, imageUrl);
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    const isLoggedIn =
      axiosInterceptor.defaults.headers.common["Authorization"] !== null;

    if (popupId === "photo1" && isLoggedIn) {
      router.push("/share");
    } else {
      setIsPopupVisible(true);
      router.push("/photo");
    }
  };

  const handleClose = () => {
    setIsPopupVisible(false);
    router.back();
  };

  return (
    <>
      <group position={position} rotation={[0, 0, 0]} onClick={handleClick}>
        {/* Photo */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[0.6, 0.8]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0, -0.03]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      {isPopupVisible && <Popup text={popupText} onClose={handleClose} />}
    </>
  );
};

export default Photo;
