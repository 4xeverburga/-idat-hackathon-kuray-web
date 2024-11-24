"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import ClimateMap from '../components/ClimateMap'; // Importación por defecto
import axios from 'axios';

type ClimateData = {
  lat: number;
  lon: number;
  city: string;
  description: string;
  maxt: string;
  mint: string;
  precipitation: string;
};

const Home = () => {
  const [view, setView] = useState('climate');
  const [data, setData] = useState<ClimateData[]>([]);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<ClimateData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [cityFilter, setCityFilter] = useState('');
  const [tempMaxFilter, setTempMaxFilter] = useState('');
  const [tempMinFilter, setTempMinFilter] = useState('');
  const [precipitationMinFilter, setPrecipitationMinFilter] = useState('');
  const [precipitationMaxFilter, setPrecipitationMaxFilter] = useState('');

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://wapp5fewnmgakrn5yzo2u5nsdm0auxzy.lambda-url.us-east-1.on.aws/`;
        const res = await axios.get(endpoint);
        if (res.data && Array.isArray(res.data.climate)) {
          const climateData = res.data.climate.map((climate: any) => ({
            lat: climate.lat,
            lon: climate.lon,
            city: climate.city,
            description: climate.description,
            maxt: climate.maxt,
            mint: climate.mint,
            precipitation: climate.precipitation,
          }));
          setData(climateData);
          setFilteredData(climateData);
        } else {
          throw new Error('La respuesta de la API no tiene la estructura esperada.');
        }
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('No se pudieron cargar los datos de la API. Por favor, inténtalo más tarde.');
      }
    };

    fetchData();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...data];

    // Filtrar por ciudad
    if (cityFilter) {
      filtered = filtered.filter((climate) =>
        climate.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // Filtrar por temperatura máxima
    if (tempMaxFilter) {
      filtered = filtered.filter((climate) => parseFloat(climate.maxt) <= parseFloat(tempMaxFilter));
    }

    // Filtrar por temperatura mínima
    if (tempMinFilter) {
      filtered = filtered.filter((climate) => parseFloat(climate.mint) >= parseFloat(tempMinFilter));
    }

    // Filtrar por rango de precipitación
    if (precipitationMinFilter) {
      filtered = filtered.filter(
        (climate) => parseFloat(climate.precipitation) >= parseFloat(precipitationMinFilter)
      );
    }
    if (precipitationMaxFilter) {
      filtered = filtered.filter(
        (climate) => parseFloat(climate.precipitation) <= parseFloat(precipitationMaxFilter)
      );
    }

    setFilteredData(filtered);
  }, [cityFilter, tempMaxFilter, tempMinFilter, precipitationMinFilter, precipitationMaxFilter, data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <h1>Mapa de Clima - Gestión Agrícola</h1>
      </header>

      {/* Contenido principal */}
      <div style={{ display: 'flex', flex: 1, padding: '20px', backgroundColor: '#f9fafc' }}>
        {/* Contenedor del mapa */}
        <div style={{ flex: 3, paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
          <h2>Mapa Climático</h2>
          <div className="filters">
            {/* Filtro por ciudad */}
            <input
              type="text"
              placeholder="Buscar por ciudad"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />

            {/* Filtro por temperatura máxima */}
            <input
              type="number"
              step="0.01"
              placeholder="Temperatura máxima (°C)"
              value={tempMaxFilter}
              onChange={(e) => setTempMaxFilter(e.target.value)}
            />

            {/* Filtro por temperatura mínima */}
            <input
              type="number"
              step="0.01"
              placeholder="Temperatura mínima (°C)"
              value={tempMinFilter}
              onChange={(e) => setTempMinFilter(e.target.value)}
            />

            {/* Filtro por precipitación mínima */}
            <input
              type="number"
              step="0.01"
              placeholder="Precipitación mínima (mm)"
              value={precipitationMinFilter}
              onChange={(e) => setPrecipitationMinFilter(e.target.value)}
            />

            {/* Filtro por precipitación máxima */}
            <input
              type="number"
              step="0.01"
              placeholder="Precipitación máxima (mm)"
              value={precipitationMaxFilter}
              onChange={(e) => setPrecipitationMaxFilter(e.target.value)}
            />
          </div>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            view === 'climate' && (
              <ClimateMap data={filteredData} setRecommendations={setRecommendations} />
            )
          )}
        </div>

        {/* Contenedor de recomendaciones */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h2>Recomendaciones</h2>
          {recommendations ? (
            <p style={{ whiteSpace: 'pre-wrap', color: '#555', lineHeight: '1.5' }}>
              {recommendations}
            </p>
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic' }}>
              Selecciona una ciudad para obtener recomendaciones específicas.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        <p>© 2024 Gestión Agrícola. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
