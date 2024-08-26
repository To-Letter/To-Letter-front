import { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Popup from "./Popup";

const Photo = ({
  position,
  imageUrl,
  popupText,
}: {
  position: [number, number, number];
  imageUrl: string;
  popupText: string;
}) => {
  const texture = useLoader(TextureLoader, imageUrl);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
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
      {showPopup && <Popup text={popupText} onClose={handleClose} />}
    </>
  );
};

export default Photo;
