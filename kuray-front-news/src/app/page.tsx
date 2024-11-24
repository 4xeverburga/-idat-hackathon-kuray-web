"use client";
import React, { useState, useEffect } from "react";
import NewsMap from "../components/NewsMap";
import axios from "axios";
type NewsData = {
    id: number;
    title: string;
    text: string;
    summary: string;
    url: string;
    image: string;
    video: string | null;
    publish_date: string;
    author: string;
    authors: string[];
    language: string;
    category: string;
    source_country: string;
    insight: string;
    lat: number;
    lon: number;
};

const Home = () => {
    const [data, setData] = useState<NewsData[]>([]);
    const [filteredData, setFilteredData] = useState<NewsData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<string | null>(null);

    // Filtros
    const [authorFilter, setAuthorFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

    // Cargar datos de noticias
    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `https://vgopt55vfhhpoa3yclphhhw2i40idexu.lambda-url.us-east-1.on.aws/s`; // URL de tu API
                const res = await axios.get(endpoint);
                if (res.data && Array.isArray(res.data.news)) {
                    setData(res.data.news);
                    setFilteredData(res.data.news);
                } else {
                    throw new Error("La respuesta de la API no tiene la estructura esperada.");
                }
            } catch (err) {
                console.error("Error al cargar los datos:", err);
                setError("No se pudieron cargar los datos de la API. Por favor, inténtalo más tarde.");
            }
        };

        fetchData();
    }, []);

    // Aplicar filtros
    useEffect(() => {
        let filtered = [...data];

        if (authorFilter) {
            filtered = filtered.filter((news) =>
                news.author.toLowerCase().includes(authorFilter.toLowerCase())
            );
        }

        if (categoryFilter) {
            filtered = filtered.filter((news) =>
                news.category.toLowerCase().includes(categoryFilter.toLowerCase())
            );
        }

        if (sourceFilter) {
            filtered = filtered.filter((news) =>
                news.source_country.toLowerCase().includes(sourceFilter.toLowerCase())
            );
        }

        if (dateFilter.from && dateFilter.to) {
            filtered = filtered.filter((news) => {
                const newsDate = new Date(news.publish_date).getTime();
                const fromDate = new Date(dateFilter.from).getTime();
                const toDate = new Date(dateFilter.to).getTime();
                return newsDate >= fromDate && newsDate <= toDate;
            });
        }

        setFilteredData(filtered);
    }, [authorFilter, categoryFilter, sourceFilter, dateFilter, data]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <header
                style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    padding: "10px 20px",
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                }}
            >
                <h1>Mapa de Noticias - Gestión Agrícola</h1>
            </header>

            <div style={{ display: "flex", flex: 1, padding: "20px", backgroundColor: "#f9fafc" }}>
                <div style={{ flex: 3, paddingRight: "20px" }}>
                    <h2>Mapa de Noticias</h2>
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Buscar por autor"
                            value={authorFilter}
                            onChange={(e) => setAuthorFilter(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por categoría"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por fuente"
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
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
                    </div>
                    {error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <NewsMap data={filteredData} setRecommendations={setRecommendations} />
                    )}
                </div>

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
                        Selecciona una categoria para obtener recomendaciones específicas.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
