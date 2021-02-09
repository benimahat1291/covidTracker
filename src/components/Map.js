import React from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css"
import { showDataOnMap } from "../utils"

function Map({ countries, casesType, center, zoom }) {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    return (

        <MapContainer
            center={center}
            zoom={zoom}
            className="map"
            scrollWheelZoom={false}
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {showDataOnMap(countries, casesType)}
        </MapContainer>
    )
}

export default Map
