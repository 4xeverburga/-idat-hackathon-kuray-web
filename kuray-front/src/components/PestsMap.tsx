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

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

const SetViewOnClick = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
};

const PestsMap = ({ data }: { data: any[] }) => {
    // Calcular los límites del mapa basados en las coordenadas de los datos
    const bounds = new LatLngBounds(data.map((point) => [point.lat, point.lng]));

    return (
        <MapContainer
            bounds={bounds}
            style={{ height: '500px', width: '100%' }} // Dimensiones del mapa
            className="map-container"
        >
            {/* Configuración inicial de la vista */}
            <SetViewOnClick coords={[0, 0]} />
            
            {/* Capa base del mapa */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Renderizar los marcadores de las plagas */}
            {data.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    <Popup>
                        <strong>Plaga: {point.pest}</strong>
                        <p>Descripción: {point.description}</p>
                        <p>Fecha de reporte: {point.date}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default PestsMap;
