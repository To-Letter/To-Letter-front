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
    let nowHours = new Date().getHours();
    
    if(nowHours<3 || nowHours>20){ // 새벽 3시 전, 저녁 8시 이후 => 밤
      return {
        loadTextureName: "night.png",
        sunLightPosition: [30, 10, -3],
        lightColor: "#efe9ff",
        intensity: 1
      }
    }else if(nowHours>2 && nowHours<6){ // 새벽 2시 이후, 새벽 6시 전 => 새벽
      return {
        loadTextureName: "night.png",
        sunLightPosition: [30, 10, -3],
        lightColor: "#e8f7ff",
        intensity: 2
      }
    }else if(nowHours>5 && nowHours<12){ // 새벽 5시 이후, 오후 12시 전 => 아침
      return {
        loadTextureName: "morning.png",
        sunLightPosition: [30, 10, -15],
        lightColor: "#fff5d8",
        intensity: 4
      }
    }else if(nowHours>11 && nowHours<17){ // 오전 11시 이후, 오후 5시 전 => 낮
      return {
        loadTextureName: "noon.png",
        sunLightPosition: [30, 10, -3],
        lightColor: "#ffffff",
        intensity: 4
      }
    }else{// 오후 4시 이후, 밤 9시 전 => 저녁
      return {
        loadTextureName: "evening.png",
        sunLightPosition: [30, 10, 15],
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
    directionalLight1.shadow.bias = -0.0001; // 그림자 세기 조절
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
          <Plane // right wall
            args={[100, 50]}
            rotation={[0, -Math.PI / 2, 0]}
            position={[50, -2, -3]}
          >
            <meshStandardMaterial
              map={bgTexture}
              // color={0x9977bb}
              side={THREE.DoubleSide}
            />
          </Plane>
        </>
      )}
    </>
  );
};

export default TimeBackground;
