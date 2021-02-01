import React from 'react';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import Leaflet from 'leaflet'
const position = [52.12, 19.21];


function getIconStyle(temp, obj){
   parseFloat(temp);

   if(20.1<temp){
       obj.color= `#ff0505`;
       obj.elemClass= "fas fa-thermometer-full"
   }
   else if(5.1<temp<=20){
       obj.color= `#e1be56`;
       obj.elemClass= `fas fa-thermometer-three-quarters`
   }
   else if(-5<temp<=5) {
       obj.color = `#9be2ed`;
       obj.elemClass = "fas fa-thermometer-half"
   }
   else if(-15<temp<=-5.1){
       obj.color= `#007ebd`;
       obj.elemClass="fas fa-thermometer-quarter"
   }
   else if(temp<=-15.1){
       obj.color= `#0006bd`;
       obj.elemClass= "fas fa-thermometer-empty"
   }
   return obj
}


function getIcon(temp){
    let obj={
        color:'#29893b',
        elemClass: 'fas fa-thermometer-half'
    }
    getIconStyle(temp, obj);



    const myIcon= Leaflet.divIcon({
        className:'divIcon',
        html:`<div><i class=${obj.elemClass} style=${obj.color}/><p>${temp}</p> </div>`,
        iconAnchor:[0,0],
        popupAnchor:[0,-5]
    })

    return myIcon
}

export default function MapComponent({info}){

    console.log(info)

    return(
        <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="map" style={{width:1000, height:950}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {info?
                info.map(item=>{
                    if((item.latitude || item.longitude) !== undefined ){
                        return <Marker key={item.id_stacji} position={[item.latitude, item.longitude]} icon={getIcon(item.temperatura)}>
                            <Popup> {item.stacja}, temperatura: {item.temperatura}°C</Popup>
                        </Marker>
                    }

            })
                : ""
            }
            {/*<Marker position={[51.505, -0.09]} icon={myIcon}>*/}
            {/*    <Popup>*/}
            {/*        A pretty CSS3 popup. <br /> Easily customizable.*/}
            {/*    </Popup>*/}
            {/*</Marker>*/}
        </MapContainer>
    )
}

