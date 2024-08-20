import { useState } from "react";
import TimeBackground from "./TimeBackground";
import SeasonBackground from "./SeasonBackground";

const SceneryIndex = () => {
  const [now, setNow] = useState<Date>(new Date());

  return (
    <>
      <TimeBackground nowHoursValue={now.getHours()}/>
      <SeasonBackground nowMonthValue={now.getMonth()}/>
    </>
  );
};

export default SceneryIndex;
