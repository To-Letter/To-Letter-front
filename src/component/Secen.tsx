import Chair from "./Room/Chair";
import Desk from "./Room/Desk";
import Room from "./Room/Room";
import SceneryIndex from "./Scenery/SceneryIndex";

interface props {
  loginModalOpenHdr: () => void;
}

const Secen = ({ loginModalOpenHdr }: props) => {
  return (
    <>
      <SceneryIndex />
      <Room />
      <Chair loginModalOpenHdr={loginModalOpenHdr} />
      <Desk />
    </>
  );
};

export default Secen;
