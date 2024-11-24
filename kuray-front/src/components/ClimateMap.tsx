"use client";
import L from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Función para generar colores dinámicos
const generateColor = (cityType: string) => {
    const hash = cityType.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Generar un color único basado en el nombre
    return `hsl(${hue}, 70%, 50%)`; // Colores vibrantes
};

// Crear íconos personalizados según el color generado
const createCustomIcon = (color: string) =>
    L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
        iconSize: [20, 20],
    });

const ClimateMap = ({ data, setRecommendations }: { data: any[]; setRecommendations: (recommendations: string) => void }) => {
    const fetchRecommendations = async (city: string, maxt: string, mint: string,precipitation: string,description:string) => {
            try {
            const res = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city, maxt, mint, precipitation, description }),
            });
            const responseData = await res.json();
            setRecommendations(responseData.recommendations || 'No se encontraron recomendaciones.');
            } catch (error) {
            console.error('Error obteniendo recomendaciones:', error);
            setRecommendations('No se pudieron obtener recomendaciones.');
            }
        };
    return (
        <MapContainer style={{ height: '70vh', width: '100%' }} center={[-11.5, -75]} zoom={6}>
            {/* Capa base del mapa */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((point, index) => (
                    <Marker
                    key={index}
                    position={[point.lat, point.lon]}
                    icon={createCustomIcon(generateColor(point.city))}
                    >
                    <Popup>
                        <strong>{point.zone}</strong>
                        <p>{point.description}</p>
                        <button
                            onClick={() => fetchRecommendations(point.city, point.maxt, point.mint, point.precipitation, point.description)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            >
                            ¿Qué se recomienda?
                        </button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default ClimateMap;
