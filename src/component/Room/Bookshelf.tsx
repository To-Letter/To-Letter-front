import { ThreeEvent } from "@react-three/fiber";
import { receiveLetterBoxModalState } from "../../recoil/letterPopupAtom";
import { useSetRecoilState } from "recoil";
import axiosInterceptor from "../../apis/axiosInterceptor";

const Bookshelf = ({ position }: { position: [number, number, number] }) => {
  const shelfWidth = 1.5;
  const shelfHeight = 0.8;
  const shelfDepth = 0.8;
  const boardThickness = 0.05;

  const setReceiveLetterBoxModal = useSetRecoilState(
    receiveLetterBoxModalState
  );

  const setReceiveLetterBoxModalClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (axiosInterceptor.defaults.headers.common["Authorization"] !== null) {
      console.log("로그인 되어있어요!");
      setReceiveLetterBoxModal(true);
    }
  };

  return (
    <group position={position} onClick={setReceiveLetterBoxModalClick}>
      {/* Bottom Board */}
      <mesh position={[0, -shelfHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, boardThickness, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Left Board */}
      <mesh
        position={[-shelfWidth / 2 + boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Right Board */}
      <mesh
        position={[shelfWidth / 2 - boardThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boardThickness, shelfHeight, shelfDepth]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
      {/* Back Board */}
      <mesh
        position={[0, 0, -shelfDepth / 2 + boardThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[shelfWidth, shelfHeight, boardThickness]} />
        <meshStandardMaterial color={"#7b5d54"} />
      </mesh>
    </group>
  );
};

export default Bookshelf;
