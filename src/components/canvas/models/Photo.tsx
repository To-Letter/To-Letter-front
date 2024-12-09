"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Popup from "./Popup";
import { usePopup } from "../../context/PopupContext";
import { useSetRecoilState } from "recoil";
import { shareLetterState } from "../../recoil/shareLetterAtom";
import axiosInterceptor from "../../apis/axiosInterceptor";

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
  const { activePopup, setActivePopup } = usePopup();
  const setShareLetterRecoil = useSetRecoilState(shareLetterState);

  const handleClick = () => {
    if (
      popupId === "photo1" &&
      axiosInterceptor.defaults.headers.common["Authorization"] !== null
    ) {
      setShareLetterRecoil(true);
    } else {
      setActivePopup(popupId);
    }
  };

  const handleClose = () => {
    if (
      popupId === "photo1" &&
      axiosInterceptor.defaults.headers.common["Authorization"] !== null
    ) {
      setShareLetterRecoil(false);
    } else {
      setActivePopup(null);
    }
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
      {activePopup === popupId && (
        <Popup text={popupText} onClose={handleClose} />
      )}
    </>
  );
};

export default Photo;
