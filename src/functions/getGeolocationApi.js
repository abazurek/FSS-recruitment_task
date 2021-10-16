import { weatherAPI } from "../temp/fetchAddresses";

function getGeolocationApi(city) {
  return `http://api.positionstack.com/v1/forward?access_key=4f2583fd551ab5f9d92ece8c1844737b&query=${city.stacja}`;
}

async function getAllApiInfo(setResponsesFunction) {
  const results = [];

  let responseWeather = await fetch(weatherAPI);
  let dataWeather = await responseWeather.json();

  async function getAllGeolocation(dataWeather, setResponsesFunction) {
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
  setResponsesFunction(responses);
}

export { getAllApiInfo };
