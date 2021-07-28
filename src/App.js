import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/HeaderComponent";
import MapComponent from "./components/MapComponent";
import WeatherApiMap from "./components/WeatherApiMap";
import { getAllApiInfo } from "./functions/getGeolocationApi";

const App = () => {
  const [country, setCountry] = useState("world");
  const [data, setData] = useState("");

  useEffect(function () {
    getAllApiInfo(setData);
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="appContainer">
        <WeatherApiMap />
        <MapComponent country={country} info={data} />
      </div>
    </div>
  );
};

export default App;
