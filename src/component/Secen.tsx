import axiosInterceptor from "../apis/axiosInterceptor";
import Chair from "./Room/Chair";
import Desk from "./Room/Desk";
import Room from "./Room/Room";
import SceneryIndex from "./Scenery/SceneryIndex";

const Secen = () => {
  return (
    <>
      <SceneryIndex />
      <Room />
      {axiosInterceptor.defaults.headers.common["Authorization"] !== null && (
        <Chair />
      )}

      <Desk />
    </>
  );
};

export default Secen;
