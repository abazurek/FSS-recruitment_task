import React,{useEffect} from 'react';
import MapComponent from "./components/MapComponent";

const API="https://danepubliczne.imgw.pl/api/data/synop/"

function fetchData(){
  fetch(`${API}`)
      .then(resp=>resp.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
}
function App() {

  useEffect(function (){
    fetchData();
  },[])
  return (
    <MapComponent />
  );
}

export default App;
