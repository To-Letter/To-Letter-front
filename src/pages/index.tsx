import { Canvas } from "@react-three/fiber";
import Secen from "../component/Secen";
import { OrbitControls } from "@react-three/drei";
import { useCallback, useState } from "react";
import Index from "../component/account/Index";

function Home() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const chairClick = useCallback(()=>{
    setShowLoginModal(prev=>!prev)
  },[])

  return (
    <>
      <Canvas shadows>
        <Secen loginModalOpenHdr={chairClick} />
        <OrbitControls  />
      </Canvas>
      {showLoginModal && <Index onClose={chairClick}/>}
    </>
  );
}

export default Home;