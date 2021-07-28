import React, { useState, useEffect } from "react";
import { apiKey } from "../temp/apiKey";

const WeatherApiMap = () => {
  const today = new Date();
  // console.log(today.getTime());
  // console.log(today.getDate());
  // console.log(today.getMonth());
  // console.log(today.getFullYear());
  // console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const [mapData, setMapData] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const position = [52.12, 19.21];

  const mapFunction = () => {
    fetch(
      `https://tile.openweathermap.org/map/clouds_new/2/2/3.png?appid=3ff91bcbefd90c3a07f29ab94b9e6aa7`
    )
      .then((resp) => console.log(resp))
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  const weatherFunction = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${position[0]}&lon=${position[1]}&exclude=current&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    weatherFunction();
    mapFunction();
    console.log(weatherData);
    // console.log(mapFunction());
  }, []);

  return <div></div>;
};

export default WeatherApiMap;
