"use client";

import React, { useEffect, useState } from "react";
import { ElementBox } from "../atoms/Box";
import { Text } from "../atoms/Text";

interface props {
  setVerifyMe: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Timer({ setVerifyMe }: props) {
  const [timer, setTimer] = useState<number>(300); // 10분 = 600초

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setVerifyMe(false);
      setTimer(300); // 타이머 초기화
    }
    return () => clearInterval(interval);
  }, [setVerifyMe, timer]);

  return (
    <ElementBox
      $width="80px"
      $justifyContent="center"
      $alignItems="center"
      $backgroundColor="#262523"
      $border="1px solid #e9e9e9"
    >
      <Text color="#e9e9e9">{formatTime(timer)}</Text>
    </ElementBox>
  );
}
