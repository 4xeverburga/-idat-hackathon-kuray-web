"use client";

import React, { useState, useEffect } from 'react';
import ViewSelector from '../components/ViewSelector'; // Importación por defecto
import ClimateMap from '../components/ClimateMap'; // Importación por defecto
import PestsMap from '../components/PestsMap'; // Importación por defecto
import InsightsMap from '../components/InsightsMap'; // Importación por defecto
import axios from 'axios';

const Home = () => {
    const [view, setView] = useState<string>('climate');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const endpoint = `/api/${view}`;
        const res = await axios.get(endpoint);
        setData(res.data);
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