import axios from 'axios'

export interface getWeatherI {
  lat: number
  lng: number
  key: any
}
export const getCurrentWeather = async ({key, lat, lng}: getWeatherI) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
  const res = await axios.get(url);
  return res.data;
}