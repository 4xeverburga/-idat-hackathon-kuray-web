import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const SetView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);
    return null;
};

const ClimateMap = ({ data }: { data: any[] }) => {
    return (
        <MapContainer
                className="map-container"
            >
                <SetView center={[0, 0]} zoom={2} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>

    );
};

export default ClimateMap;