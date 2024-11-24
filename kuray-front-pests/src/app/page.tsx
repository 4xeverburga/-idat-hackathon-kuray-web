"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import PestsMap from '../components/PestsMap'; // Importación por defecto
import axios from 'axios';

type PestsData = {
  lat: number;
  lon: number;
  pest: string;
  description: string;
  date: string;
  region:string;
};

const Home = () => {
  const [view, setView] = useState('pests');
  const [data, setData] = useState<PestsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://wapp5fewnmgakrn5yzo2u5nsdm0auxzy.lambda-url.us-east-1.on.aws/`;
        const res = await axios.get(endpoint);
        console.log('Respuesta de la API:', res);
        // Validar la estructura de la respuesta
        if (res.data && Array.isArray(res.data.pests)) {
          const pestsData = res.data.pests
            .filter((pest: any) => pest.lat !== undefined && pest.lon !== undefined) // Filtrar datos inválidos
            .map((pest: any) => ({
              lat: pest.lat,
              lon: pest.lon,
              pest: pest.pest,
              description: pest.description,
              date: pest.date,
              region: pest.region
            }));
          setData(pestsData); // Guardar los datos procesados
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

  return (
    <div>
      <ViewSelector setView={setView} />
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        view === 'pests' && <PestsMap data={data} />
      )}
    </div>
  );
};

export default Home;
