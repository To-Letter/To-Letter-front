import React from "react";
import { Html } from "@react-three/drei";

interface PopupProps {
  text: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ text, onClose }) => {
  return (
    <Html center>
      <div className="popup">
        <div className="popup-header">
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-content">
          <p>{text}</p>
        </div>
      </div>
    </Html>
  );
};

export default Popup;
