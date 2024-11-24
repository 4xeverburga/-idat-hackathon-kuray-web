"use client";
import L from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Función para generar colores dinámicos
const generateColor = (pestType: string) => {
    const hash = pestType.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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

    const PestsMap = ({ data, setRecommendations }: { data: any[]; setRecommendations: (recommendations: string) => void }) => {
        const fetchRecommendations = async (pest: string, region: string, date: string) => {
          try {
            const res = await fetch('/api/recommendations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ pest, region, date }),
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
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {data.map((point, index) => (
                <Marker
                  key={index}
                  position={[point.lat, point.lon]}
                  icon={createCustomIcon(generateColor(point.pest))}
                >
                  <Popup>
                    <strong>Plaga: {point.pest}</strong>
                    <p>Descripción: {point.description}</p>
                    <p>Fecha de reporte: {point.date}</p>
                    <p>Región: {point.region}</p>
                    <button
                      onClick={() => fetchRecommendations(point.pest, point.region, point.date)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      ¿Qué hacer?
                    </button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          );
        };
export default PestsMap;
