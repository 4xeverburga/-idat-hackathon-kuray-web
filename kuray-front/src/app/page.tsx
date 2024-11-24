"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import ClimateMap from '../components/ClimateMap'; // Importación por defecto
import axios from 'axios';

type ClimateData = {
  lat: number;
  lon: number;
  zone: string;
  description: string;
  recommendation: string;
};

const Home = () => {
  const [view, setView] = useState('climate');
  const [data, setData] = useState<ClimateData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Comentamos la llamada real a la API
      // const endpoint = `/api/${view}`;
      // const res = await axios.get(endpoint);
      // setData(res.data);

      // Datos ficticios para Perú
      if (view === 'climate') {
        const climateData: ClimateData[] = [
          {
            lat: -12.0464,
            lon: -77.0428,
            zone: 'Lima',
            description: 'Clima cálido y húmedo',
            recommendation: 'Plantar maíz y frutas tropicales',
          },
          {
            lat: -13.1631,
            lon: -72.545,
            zone: 'Cusco',
            description: 'Clima templado y seco',
            recommendation: 'Cultivar quinua y papa',
          },
        ];
        setData(climateData);
      }
    };
    fetchData();
  }, [view]);

  return (
    <div>
      <ViewSelector setView={setView} />
      {view === 'climate' && <ClimateMap data={data} />}
    </div>
  );
};

export default Home;
