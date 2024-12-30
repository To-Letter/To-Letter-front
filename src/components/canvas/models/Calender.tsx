"use client";

import { useEffect, useState, useMemo } from "react";
import { Text } from "@react-three/drei";

const Calendar = () => {
  /** 현재 날짜 */
  const [date, setDate] = useState(new Date());

  /** 월 이름 */
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  /** 월 이름 */
  const month = monthNames[date.getMonth()];
  /** 일 */
  const day = date.getDate();

  // 요일에 따라 dayText 색상 변경
  const dayColor = useMemo(() => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      return "red";
    } else if (dayOfWeek === 6) {
      return "blue";
    } else {
      return "black";
    }
  }, [date]);

  /** 1초마다 현재 날짜 업데이트 */
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {/* Front Face */}
      <mesh
        position={[-2, -1.5, -2.3]}
        rotation={[-Math.PI / 10, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.7, 1, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Back Face */}
      <mesh
        position={[-2, -1.5, -2.7]}
        rotation={[Math.PI / 10, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.7, 1, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Bottom Face */}
      <mesh
        position={[-2, -2.05, -2.5]}
        rotation={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.7, 0.1, 0.8]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* month text */}
      <Text
        position={[-2, -1.2, -2.33]}
        rotation={[-Math.PI / 10, 0, 0]}
        fontSize={0.28}
        color="black"
      >
        {month}
      </Text>

      {/* day text */}
      <Text
        position={[-2.02, -1.6, -2.2]}
        rotation={[-Math.PI / 10, 0, 0]}
        fontSize={0.5}
        color={dayColor}
      >
        {day}
      </Text>
    </group>
  );
};

export default Calendar;
