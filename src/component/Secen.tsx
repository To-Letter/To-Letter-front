import Chair from "./Chair";
import Desk from "./Desk";
import Room from "./Room";
import SceneryIndex from "./Scenery/SceneryIndex";

interface props {
  loginModalOpenHdr: () => void;
}

const Secen = ({ loginModalOpenHdr }: props) => {
  return (
    <>
      <SceneryIndex/>
      <Room />
      <Chair loginModalOpenHdr={loginModalOpenHdr} />
      <Desk />
    </>
  );
};

export default Secen;
