import axios from "axios";
import { useState } from "react";

const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (capital) => {
  return axios.get(`
  https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`);
};

const getIcon = (iconId) => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};


const WeatherInfo = ({ capital }) => {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherTemperature, setWeatherTemperature] = useState(null);
  const [weatherMain, setWeatherMain] = useState(null);
  const [weatherWind, setWeatherWind] = useState(null);

  if (capital) {
    getWeather(capital)
      .then(response => {
        const temp = response.data.weather[0];
        const { main, icon } = temp;
        const temperature = response.data.main.temp;
        const wind = response.data.wind.speed;
        setWeatherWind(wind);
        setWeatherTemperature(temperature);
        setWeatherMain(main);
        setWeatherIcon(getIcon(icon));
      });
  }

  const style = {
    "backgroundColor": "rgba(238, 238, 238, 0.8)",
    "padding": "10px",
    "borderRadius": "5px",
    "marginTop": "10px"

  };

  return (
    <div style={style}>
      <h2>Weather in {capital}</h2>
      <h3>{weatherMain}</h3>
      <p>Temperature: {weatherTemperature} ºC</p>
      <img src={weatherIcon} alt={weatherMain} />
      <p>Wind speed: {weatherWind} m/s</p>
    </div>
  );
};


export default WeatherInfo;