"use client";
import L from 'leaflet';

// Configuración manual del icono
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41], // Tamaño del icono
    iconAnchor: [12, 41], // Punto de anclaje
    popupAnchor: [1, -34], // Posición del popup
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41], // Tamaño de la sombra
});

L.Marker.prototype.options.icon = defaultIcon;

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);
    return null;
};

const ClimateMap = ({ data }: { data: any[] }) => {
    return (
        <MapContainer
            style={{ height: '500px', width: '100%' }} // Dimensiones del mapa
            className="map-container"
        >
            {/* Configuración de la vista inicial */}
            <SetView center={[0, 0]} zoom={2} />
            
            {/* Capa base del mapa */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Iterar sobre los datos para renderizar marcadores */}
            {data.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    <Popup>
                        <strong>{point.zone}</strong>
                        <p>{point.description}</p>
                        <p>Recomendación: {point.recommendation}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default ClimateMap;
