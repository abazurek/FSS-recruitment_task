import React,{useState,useEffect} from 'react';
import MapComponent from "./components/MapComponent";

const weatherAPI = "https://danepubliczne.imgw.pl/api/data/synop/";

function getGeolocationApi(city){
    return `http://api.positionstack.com/v1/forward?access_key=4f2583fd551ab5f9d92ece8c1844737b&query=${city.stacja}`
}

function App() {
  const [data, setData]=useState("");


    async function getAllApiInfo(){
      const results = []

      let responseWeather = await fetch(weatherAPI);
      let dataWeather = await responseWeather.json();

      async function result(elem){
              const array=[];
              let responseGeolocation = (await fetch(getGeolocationApi(elem)))
              let dataGeolocation = await responseGeolocation.json()
              array.push(dataGeolocation.data[0].latitude,dataGeolocation.data[0].longitude );
              elem = {...elem, latitude: array[0], longitude: array[1]};
              results.push(elem);
        return results;
      }

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

      await asyncForEach(dataWeather, result);
      setData(results)
     }



  useEffect(function (){
      getAllApiInfo();
  },[])


  return (
    <MapComponent info={data}/>
  );
}



export default App;
