import { useState } from "react";
import TimeBackground from "./TimeBackground";

const SceneryIndex = () => {
  const [now, setNow] = useState<Date>(new Date());

  return (
    <>
      <TimeBackground nowHoursValue={now.getHours()}/>
    </>
  );
};

export default SceneryIndex;
