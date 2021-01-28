import React,{useState,useEffect} from 'react';
import MapComponent from "./components/MapComponent";

const weatherAPI = "https://danepubliczne.imgw.pl/api/data/synop/";

function App() {
  const [data, setData]=useState("");

  function fetchWeather(){
    fetch(weatherAPI)
        .then(resp=>resp.json())
        .then(resp=>setData(resp))
        .catch(err=>console.log(err))
  }



    // if(data){
    //     data.forEach(elem=>{
    //
    //     })
    // }

    function fetchLocation(city) {
        //  https://positionstack.com/
        fetch(getGeocodingAddress("Blachownia"))
            .then(response => response.json())
            .then(json => json.data[0])
            .then(receivedFirstRow => {
                console.log(prettifyLog(receivedFirstRow))
            })
            .catch(err => {
                console.error(err);
            });
    }

    function getGeocodingAddress(city) {
        return `http://api.positionstack.com/v1/forward?access_key=4f2583fd551ab5f9d92ece8c1844737b&query=${city}`;
    }

    function prettifyLog(row) {
        return "nazwa miasta = " + row.name
        + "\nlatitude = " + row.latitude
        + "\nlongitude = " + row.longitude
    }


  useEffect(function (){
    fetchWeather();
    fetchLocation()
  },[])


  return (
    <MapComponent />
  );
}



export default App;
