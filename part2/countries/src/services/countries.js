import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getAll = () => axios.get(`${baseUrl}all`);
const getWeather = capital =>
  axios.get(`${weatherUrl}${capital}&appid=${api_key}&units=metric`);

export default { getAll, getWeather };
