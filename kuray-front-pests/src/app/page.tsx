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
};



const Home = () => {
  const [view, setView] = useState('pests');
  const [data, setData] = useState<PestsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Comentamos la llamada real a la API
      // const endpoint = `/api/${view}`;
      // const res = await axios.get(endpoint);
      // setData(res.data);

      // Datos ficticios para Perú
      if (view === 'pests') {
        try {
            // Cargar el archivo JSON de plagas
            const response = await axios.get('pests.json');
            const pestsData = response.data.pests
                .filter((pest: any) => pest.lat !== undefined && pest.lon !== undefined) // Filtrar coordenadas inválidas
                .map((pest: any) => ({
                    lat: pest.lat,
                    lon: pest.lon, // Convertir 'lon' a 'lng'
                    pest: pest.pest,
                    description: pest.description,
                    date: pest.date,
                }));
            setData(pestsData);
        } catch (error) {
            console.error('Error cargando pests.json:', error);
        }
    }
    };
    fetchData();
  }, [view]);

  return (
    <div>
      <ViewSelector setView={setView} />
      {view === 'pests' && <PestsMap data={data} />}
    </div>
  );
};

export default Home;
