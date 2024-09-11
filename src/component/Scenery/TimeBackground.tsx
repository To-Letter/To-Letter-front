import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect, useMemo } from "react";

interface BackgroundProps {
  nowHoursValue: number;
}
interface timeZoneI {
  loadTextureName: string,
  sunLightPosition: number[],
  lightColor: string
  intensity: number
}

const TimeBackground = ({nowHoursValue}:BackgroundProps) => {
  const { scene } = useThree();
  /**
   * 실시간 체크를 못할까..?ㅜㅜ
   */
  const timeZone:timeZoneI = useMemo(():timeZoneI=>{
    if(nowHoursValue<3 || nowHoursValue>20){ // 새벽 3시 전, 저녁 8시 이후 => 밤
      return {
        loadTextureName: "night.png",
        sunLightPosition: [0, 80, 65],
        lightColor: "#efe9ff",
        intensity: 1
      }
    }else if(nowHoursValue>2 && nowHoursValue<6){ // 새벽 2시 이후, 새벽 6시 전 => 새벽
      return {
        loadTextureName: "night.png",
        sunLightPosition: [0, 80, -65],
        lightColor: "#e8f7ff",
        intensity: 2
      }
    }else if(nowHoursValue>5 && nowHoursValue<12){ // 새벽 5시 이후, 오후 12시 전 => 아침
      return {
        loadTextureName: "morning.png",
        sunLightPosition: [0, 80, -45],
        lightColor: "#fff5d8",
        intensity: 4
      }
    }else if(nowHoursValue>11 && nowHoursValue<17){ // 오전 11시 이후, 오후 5시 전 => 낮
      return {
        loadTextureName: "noon.png",
        sunLightPosition: [0, 80, -3],
        lightColor: "#ffffff",
        intensity: 4
      }
    }else{// 오후 4시 이후, 밤 9시 전 => 저녁
      return {
        loadTextureName: "evening.png",
        sunLightPosition: [0, 80, 45],
        lightColor: "#fff6e9",
        intensity: 3
      }
    }
  }, [])
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/texture/scenery/${timeZone.loadTextureName}`,
      (texture) => {
        setBgTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );
  }, [timeZone.loadTextureName]);

  useEffect(() => {
    const directionalLight1 = new THREE.DirectionalLight(timeZone.lightColor, timeZone.intensity);
    directionalLight1.position.set(timeZone.sunLightPosition[0], timeZone.sunLightPosition[1], timeZone.sunLightPosition[2]);
    directionalLight1.castShadow = true;
    directionalLight1.receiveShadow = true;
    directionalLight1.shadow.bias = 100; // 그림자 세기 조절
    directionalLight1.shadow.mapSize = new THREE.Vector2(2048, 2048);

    const target = new THREE.Object3D();
    target.position.set(50, -2, -3); // Plane의 위치를 타겟으로 설정
    scene.add(target);
    directionalLight1.target = target;
    scene.add(directionalLight1);

    const DirectionalLightHelper1 = new THREE.DirectionalLightHelper(directionalLight1);
    scene.add(DirectionalLightHelper1);
  }, [scene, timeZone.lightColor, timeZone.intensity, timeZone.sunLightPosition]);

  return (
    <>
      {bgTexture && (
        <>
          <Plane
            args={[200, 75]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[100, 0, -75]}
          >
            <meshStandardMaterial
              map={bgTexture}
              side={THREE.DoubleSide}
            />
          </Plane>
        </>
      )}
    </>
  );
};

export default TimeBackground;
