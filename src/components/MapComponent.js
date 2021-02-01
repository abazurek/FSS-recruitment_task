import React from 'react';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import Leaflet from 'leaflet'
const position = [52.12, 19.21];



function getIconImage(temp){
   parseFloat(temp);

    let srcPath='https://www.flaticon.com/svg/vstatic/svg/4150/4150977.svg?token=exp=1612215648~hmac=530e9291a4ebd6a4755d43c040c32382';

   if(20.1<temp){
       srcPath= 'https://www.flaticon.com/svg/vstatic/svg/1684/1684375.svg?token=exp=1612215367~hmac=d1650a5f43a03ce10b0e2be85259d5be'
   }
   else if(5.1 < temp && temp <= 20){
       srcPath= 'https://www.flaticon.com/svg/vstatic/svg/2892/2892892.svg?token=exp=1612215587~hmac=69fe72026a8238949be29b7d6d4e254f'
   }
   else if(-5<temp && temp<=5) {
       srcPath = 'https://www.flaticon.com/svg/vstatic/svg/4151/4151003.svg?token=exp=1612215367~hmac=5ad5a774f4a95d08778e82775ffa553b'
   }
   else if(-15<temp && temp<=-5.1){
       srcPath='https://www.flaticon.com/svg/vstatic/svg/1684/1684374.svg?token=exp=1612215501~hmac=f833cecf8eb80267def922aeea1b138a'
   }
   else if(temp<=-15.1){
       srcPath= "https://www.flaticon.com/svg/vstatic/svg/899/899708.svg?token=exp=1612215367~hmac=bf2296ec3b7fb0c8c2f4fb0cb338d497"
   }
   return srcPath
}


function getIcon(temp){

    const myIcon= Leaflet.divIcon({
        iconUrl: 'https://cdn1.iconfinder.com/data/icons/weather-306/100/Icon_13-2-61_1-256.png',
        className:'divIcon',
        html:`<div><img src=${getIconImage(temp)} alt="temperature icon"/><p>${temp}</p> </div>`,
        iconSize:[25,25],
        iconAnchor:[0,0],
        popupAnchor:[0,-5]
    })

    return myIcon
}

export default function MapComponent({info}){
    return(<>
            {!info? <p className='loading-paragraph'>Loading temperature...</p>:''}
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
                : ''
            }
        </MapContainer>
        </>
    )
}

