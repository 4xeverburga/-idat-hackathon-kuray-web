"use client";
import L from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const generateColor = (category: string | undefined) => {
    if (!category) {
        return '#000000'; // Retorna negro si la categoría no está definida
    }
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`; // Genera un color vibrante basado en la categoría
};


const createCustomIcon = (color: string) =>
    L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
        iconSize: [20, 20],
    });

const NewsMap = ({ data, setRecommendations }: { data: any[]; setRecommendations: (recommendations: string) => void }) => {
    const fetchRecommendations = async (title: string, category: string, publish_date: string,insight: string,text: string) => {
        try {
        const res = await fetch('/api/recommendations', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, category, publish_date, insight,text }),
        });
        const responseData = await res.json();
        setRecommendations(responseData.recommendations || 'No se encontraron recomendaciones.');
        } catch (error) {
        console.error('Error obteniendo recomendaciones:', error);
        setRecommendations('No se pudieron obtener recomendaciones.');
        }
    };
    return (
        <MapContainer style={{ height: '70vh', width: '100%' }} center={[-34.5, -64.9]} zoom={5}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((news,index) => (
                <Marker
                    key={index}
                    position={[news.lat, news.lon]}
                    icon={createCustomIcon(generateColor(news.category))}
                >
                    <Popup>
                        <strong>{news.title}</strong>
                        <p>¿Insight? {news.insight}</p>
                        <a href={news.url} target="_blank" rel="noopener noreferrer">{news.url}</a>
                        <p>Categoría: {news.category ? news.category : 'No clasificado'}</p>
                        <button
                            onClick={() => fetchRecommendations(news.title, news.category, news.publish_date, news.insigh,news.text)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Ver detalles
                        </button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default NewsMap;
