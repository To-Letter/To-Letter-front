import Cloud from './Cloud'
import Rain from './Rain'
import Snow from './Snow'

export default function WeatherBackground({weatherInfo}:{weatherInfo:string}) {
  return (
    <>
      {weatherInfo === "Clouds" && <Cloud/>}
      {weatherInfo === "Snow" && <Snow/>}
      {weatherInfo === "Rain" && <Rain/>}
    </>
  )
}
