import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";

const weatherAPI = "https://danepubliczne.imgw.pl/api/data/synop/";

function getGeolocationApi(city) {
  return `http://api.positionstack.com/v1/forward?access_key=4f2583fd551ab5f9d92ece8c1844737b&query=${city.stacja}`;
}

function App() {
  const [data, setData] = useState("");

  async function getAllApiInfo() {
    const results = [];

    let responseWeather = await fetch(weatherAPI);
    let dataWeather = await responseWeather.json();

    async function getAllGeolocation(dataWeather) {
      try {
        await Promise.all(
          dataWeather.map((elem) =>
            fetch(getGeolocationApi(elem))
              .then((response) => response.json())
              .then((resp) =>
                results.push({
                  ...elem,
                  latitude: resp.data[0].latitude,
                  longitude: resp.data[0].longitude,
                })
              )
          )
        );
        return results;
      } catch (error) {
        console.log(error);
      }
    }

    const responses = await getAllGeolocation(dataWeather);
    setData(responses);
  }

  useEffect(function () {
    getAllApiInfo();
  }, []);

  return <MapComponent info={data} />;
}

export default App;
