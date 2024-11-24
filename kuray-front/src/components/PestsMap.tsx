import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const SetViewOnClick = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
};

const PestsMap = ({ data }: { data: any[] }) => {
    return (
        <MapContainer bounds={[[0, 0], [0, 0]]} style={{ height: '500px', width: '100%' }}>
        <SetViewOnClick coords={[0, 0]} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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