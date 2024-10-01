import Cloud from './Cloud'
import Rain from './Rain'
import Snow from './Snow'

export default function WeatherBackground({weatherInfo, nowHoursValue}:{weatherInfo:string, nowHoursValue: number}) {
  return (
    <>
      {weatherInfo === "Clouds" && <Cloud nowHoursValue={nowHoursValue}/>}
      {weatherInfo === "Snow" && <Snow/>}
      {weatherInfo === "Rain" && <Rain/>}
    </>
  )
}
