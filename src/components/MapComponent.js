import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import LoadingComponent from "./LoadingComponent";
import { divIcon } from "leaflet";
import {
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  TileLayer,
  LayerGroup,
} from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudSunRain,
  faSnowflake,
  faIcicles,
} from "@fortawesome/free-solid-svg-icons";

const position = [52.12, 19.21];

function getIcon(temp) {
  const temperature = parseFloat(temp);

  let currentIcon = faSun;
  let color = { color: "#fcba03" };

  if (20.1 < temperature) {
    currentIcon = faSun;
    color.color = "#e64922";
  } else if (5.1 < temperature && temperature <= 20) {
    currentIcon = faCloudSun;
    color.color = "#fcc603";
  } else if (-5 < temperature && temperature <= 5) {
    currentIcon = faCloudSunRain;
    color.color = "#46cae8";
  } else if (-15 < temperature && temperature <= -5.1) {
    currentIcon = faSnowflake;
    color.color = "#2c8fa3";
  } else if (temperature <= -15.1) {
    currentIcon = faIcicles;
    color.color = "#0781b5";
  }

  const iconMarkup = renderToStaticMarkup(
    <div className="divIcon">
      <FontAwesomeIcon
        title=""
        className="weatherIcon"
        icon={currentIcon}
        style={color}
      />
      <p>{temp}</p>{" "}
    </div>
  );
  const myIcon = divIcon({
    html: iconMarkup,
    iconSize: [25, 25],
    iconAnchor: [10, -15],
    popupAnchor: [0, -5],
  });

  return myIcon;
}

export default function MapComponent({ country, info }) {
  return (
    <div className="mapWrapper">
      {!info && <LoadingComponent />}
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        className="map"
        style={{ width: 900, height: 900 }}
      >
        <LayersControl>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {info
            ? info.map((item) => {
                if ((item.latitude || item.longitude) !== undefined) {
                  return (
                    <Marker
                      key={item.id_stacji}
                      position={[item.latitude, item.longitude]}
                      icon={getIcon(item.temperatura)}
                    >
                      <Popup>
                        {item.stacja}, temperatura: {item.temperatura}°C
                      </Popup>
                    </Marker>
                  );
                }
              })
            : ""}
        </LayersControl>
        <LayersControl.Overlay>
          <LayerGroup url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3ff91bcbefd90c3a07f29ab94b9e6aa7" />
        </LayersControl.Overlay>
      </MapContainer>
    </div>
  );
}
