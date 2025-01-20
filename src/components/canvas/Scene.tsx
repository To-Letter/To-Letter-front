"use client";

import Chair from "./models/Chair";
import Desk from "./models/Desk";
import Room from "./Room";
import SceneryIndex from "./Scenery/SceneryIndex";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

const Scene = () => {
  return (
    <>
      <SceneryIndex />
      <Room />
      {axiosInterceptor.defaults.headers.common["Authorization"] !==
        undefined && <Chair />}
      <Chair />
      <Desk />
    </>
  );
};

export default Scene;
