'use client'
import React, { useState, useEffect } from 'react';
import PestsMap from '../components/PestsMap';
import axios from 'axios';

type PestsData = {
  lat: number;
  lon: number;
  pest: string;
  description: string;
  date: string;
  region: string;
};

const Home = () => {
  const [view, setView] = useState('pests');
  const [data, setData] = useState<PestsData[]>([]);
  const [recommendations, setRecommendations] = useState<string | null>(null); // Estado para recomendaciones
  const [filteredData, setFilteredData] = useState<PestsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [regionFilter, setRegionFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://wapp5fewnmgakrn5yzo2u5nsdm0auxzy.lambda-url.us-east-1.on.aws/`;
        const res = await axios.get(endpoint);
        if (res.data && Array.isArray(res.data.pests)) {
          const pestsData = res.data.pests.map((pest: any) => ({
            lat: pest.lat,
            lon: pest.lon,
            pest: pest.pest,
            description: pest.description,
            date: pest.date,
            region: pest.region,
          }));
          setData(pestsData);
          setFilteredData(pestsData);
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

    if (regionFilter) {
      filtered = filtered.filter((pest) =>
        pest.region.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }

    if (dateFilter.from && dateFilter.to) {
      filtered = filtered.filter((pest) => {
        const pestDate = new Date(pest.date).getTime();
        const fromDate = new Date(dateFilter.from).getTime();
        const toDate = new Date(dateFilter.to).getTime();
        return pestDate >= fromDate && pestDate <= toDate;
      });
    }

    if (searchFilter) {
      filtered = filtered.filter((pest) =>
        pest.pest.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [regionFilter, dateFilter, searchFilter, data]);

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
        <h1>Mapa de Plagas - Gestión Agrícola</h1>
      </header>

      {/* Contenido principal */}
      <div style={{ display: 'flex', flex: 1, padding: '20px', backgroundColor: '#f9fafc' }}>
        {/* Contenedor del mapa */}
        <div style={{ flex: 3, paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
          <h2>Mapa de Plagas</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar por región"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            />
            <input
              type="date"
              placeholder="Desde"
              value={dateFilter.from}
              onChange={(e) => setDateFilter((prev) => ({ ...prev, from: e.target.value }))}
            />
            <input
              type="date"
              placeholder="Hasta"
              value={dateFilter.to}
              onChange={(e) => setDateFilter((prev) => ({ ...prev, to: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Buscar plaga"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            view === 'pests' && <PestsMap data={filteredData} setRecommendations={setRecommendations} />
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
            height: '100%', // Mantener altura completa
            display: 'flex', // Activar flexbox
            flexDirection: 'column', // Mantener diseño de columna
            justifyContent: 'center', // Centrar verticalmente
            alignItems: 'center', // Centrar horizontalmente
            textAlign: 'center', // Opcional: centrar el texto
          }}
        >
          <h2>Recomendaciones</h2>
          {recommendations ? (
            <p style={{ whiteSpace: 'pre-wrap', color: '#555', lineHeight: '1.5' }}>
              {recommendations}
            </p>
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic' }}>
              Selecciona una plaga para obtener recomendaciones específicas.
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
