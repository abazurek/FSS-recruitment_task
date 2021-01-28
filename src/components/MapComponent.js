import React from 'react';

import { MapContainer, TileLayer} from 'react-leaflet'

const position = [52.12, 19.21];


export default function MapComponent(){
    return(
        <MapContainer center={position} zoom={6} scrollWheelZoom={false} className="map" style={{width:700, height:700}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

