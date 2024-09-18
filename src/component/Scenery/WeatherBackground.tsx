import React, { useEffect, useState } from 'react' 
import { getCurrentWeather } from '../../utils/weatherApi'
import type { locationI } from './SceneryIndex'
import Cloud from './Cloud'

export default function WeatherBackground({lat, lng}:locationI) {
  const [weatherInfo, setWeatherInfo] =useState<any>("")
  const getWeather = async ()=>{
      const data = await getCurrentWeather({lat:lat, lng:lng, key: process.env.REACT_APP_OPENWEATHERMAP_API_KEY});
      setWeatherInfo(data.weather[0].main)
  }
  useEffect(()=>{
    if(weatherInfo === ""){
      getWeather();
    }
    console.log("weatherInfo",weatherInfo)
  }, [lat, lng, weatherInfo])
  return (
    <>
      {weatherInfo === "Clouds" && <Cloud/>}
    </>
  )
}
