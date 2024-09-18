import { useEffect, useState } from "react";
import TimeBackground from "./TimeBackground";
import SeasonBackground from "./SeasonBackground";
import WeatherBackground from "./WeatherBackground";

export interface locationI{
  lat:	number
  lng:	number
}

const SceneryIndex = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [onLocation, setOnLocation] = useState<boolean>(false);
  const [myLocation, setMyLocation] = useState<locationI>({
    lat: 0,
    lng: 0
  })


  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('사용자가 위치 정보 제공을 거부했습니다.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('위치 정보를 사용할 수 없습니다.');
              break;
            case error.TIMEOUT:
              alert('위치 정보 요청이 시간 초과되었습니다.');
              break;
            default:
              alert('알 수 없는 오류가 발생했습니다.');
              break;
          }
          setMyLocation({
            lat: 0,
            lng: 0
          })
        })
    } else {
      alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setMyLocation({
        lat: 0,
        lng: 0
      })
    }
  },[])
  return (
    <>
      <TimeBackground nowHoursValue={now.getHours()}/>
      <SeasonBackground nowMonthValue={now.getMonth()}/>
      {
        (myLocation.lat !== 0 || myLocation.lng !== 0)
        && <WeatherBackground lat={myLocation.lat} lng={myLocation.lng} />
      }
    </>
  );
};

export default SceneryIndex;
