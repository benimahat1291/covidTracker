import React from 'react';
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import "./Map.css"

function Map({center, zoom}) {
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
            >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 />

            </MapContainer>
    )
}

export default Map
