"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import InsightsData from '../components/InsightsData'; // Importación por defecto
//import axios from 'axios';

type InsightsData = {
  country: string;
  headline: string;
};

const Home = () => {
  const [view, setView] = useState('insights');
  const [data, setData] = useState<InsightsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Comentamos la llamada real a la API
      // const endpoint = `/api/${view}`;
      // const res = await axios.get(endpoint);
      // setData(res.data);

      // Datos ficticios para Perú
      if (view === 'insights') {
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
      {view === 'climate' && <InsightsData data={data} />}
    </div>
  );
};

export default Home;
