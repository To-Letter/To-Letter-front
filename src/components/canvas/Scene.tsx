"use client";

import Chair from "./models/Chair";
import Desk from "./models/Desk";
import Room from "./Room";
import SceneryIndex from "./Scenery/SceneryIndex";
import axiosInterceptor from "@/lib/axios-client"; // 경로만 수정

const Scene = () => {
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

export default Scene;
