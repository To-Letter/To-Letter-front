import Chair from "./Room/Chair";
import Desk from "./Room/Desk";
import Room from "./Room/Room";
import SceneryIndex from "./Scenery/SceneryIndex";
import sessionStorageService from "../utils/sessionStorageService";

interface props {
  loginModalOpenHdr: () => void;
}

const Secen = ({ loginModalOpenHdr }: props) => {
  return (
    <>
      <SceneryIndex />
      <Room />
      {
        sessionStorageService.get('accessToken') === null 
        &&<Chair loginModalOpenHdr={loginModalOpenHdr} />
      }
      
      <Desk />
    </>
  );
};

export default Secen;
