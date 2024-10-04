import { Canvas } from "@react-three/fiber";
import Secen from "../component/Secen";
import { OrbitControls } from "@react-three/drei";
import { useCallback, useState, useContext, useEffect } from "react";
import Index from "../component/account/Index";
import { PopupProvider } from "../context/PopupContext";
import { MenuContext } from "../context/MenuContext";
import KakaoSignup from "../component/account/KakaoSignup";
import { useLocation } from "react-router-dom";

function Home() {
  const { menuNumber, setMenuNumber } = useContext(MenuContext)!;
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const location = useLocation();

  const chairClick = useCallback(() => {
    setShowLoginModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (menuNumber === 3 || location.state?.showPopup) {
      setShowLoginModal(true);
    }
  }, [menuNumber, location.state]);

  return (
    <>
      <PopupProvider>
        <Canvas shadows>
          <Secen loginModalOpenHdr={chairClick} />
          <OrbitControls
            minPolarAngle={Math.PI / 2.5} // under
            maxPolarAngle={1.396} // 약 80도
            minAzimuthAngle={-Math.PI / 4} // left
            maxAzimuthAngle={Math.PI / 4} // right
            enablePan={false} // Ctrl 키로 시점 이동 비활성화
            minDistance={3} // 최소 확대 거리
            maxDistance={3} // 최대 축소 거리
          />
        </Canvas>
        {showLoginModal && <Index onClose={chairClick} />}
        {menuNumber === 3 && <KakaoSignup />}
      </PopupProvider>
    </>
  );
}

export default Home;
