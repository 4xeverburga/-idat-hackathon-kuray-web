"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import ClimateMap from '../components/ClimateMap'; // Importación por defecto
import PestsMap from '../components/PestsMap'; // Importación por defecto
import InsightsMap from '../components/InsightsMap'; // Importación por defecto
import axios from 'axios';

type ClimateData = {
  lat: number;
  lng: number;
  zone: string;
  description: string;
  recommendation: string;
};

type PestsData = {
  lat: number;
  lng: number;
  pest: string;
  description: string;
  date: string;
};

type InsightsData = {
  country: string;
  headline: string;
};

const Home = () => {
  const [view, setView] = useState('climate');
  const [data, setData] = useState<ClimateData[] | PestsData[] | InsightsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Comentamos la llamada real a la API
      // const endpoint = `/api/${view}`;
      // const res = await axios.get(endpoint);
      // setData(res.data);

      // Datos ficticios para Perú
      if (view === 'climate') {
        setData([
          {
            lat: -12.0464,
            lng: -77.0428,
            zone: 'Lima',
            description: 'Clima cálido y húmedo',
            recommendation: 'Plantar maíz y frutas tropicales',
          },
          {
            lat: -13.1631,
            lng: -72.545,
            zone: 'Cusco',
            description: 'Clima templado y seco',
            recommendation: 'Cultivar quinua y papa',
          },
        ]);
      } else if (view === 'pests') {
        setData([
          {
            lat: -12.0464,
            lng: -77.0428,
            pest: 'Langosta',
            description: 'Insectos voraces que dañan cultivos de maíz',
            date: '2024-11-22',
          },
          {
            lat: -14.834,
            lng: -74.964,
            pest: 'Mosca blanca',
            description: 'Afecta principalmente cultivos de tomate',
            date: '2024-11-20',
          },
        ]);
      } else if (view === 'insights') {
        setData([
          {
            country: 'Perú',
            headline: 'Aumento en la exportación de palta hacia Europa',
          },
          {
            country: 'Perú',
            headline: 'Sequia en zonas del norte afecta la producción de arroz',
          },
        ]);
      }
    };
    fetchData();
  }, [view]);

  return (
    <div>
      <ViewSelector setView={setView} />
      {view === 'climate' && <ClimateMap data={data} />}
      {view === 'pests' && <PestsMap data={data} />}
      {view === 'insights' && <InsightsMap data={data} />}
    </div>
  );
};

export default Home;
