import Chair from "./Room/Chair";
import Desk from "./Room/Desk";
import Room from "./Room/Room";
import SceneryIndex from "./Scenery/SceneryIndex";
import sessionStorageService from "../utils/sessionStorageService";

const Secen = () => {
  return (
    <>
      <SceneryIndex />
      <Room />
      {
        sessionStorageService.get('accessToken') === null 
        &&<Chair/>
      }
      
      <Desk />
    </>
  );
};

export default Secen;
