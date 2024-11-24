import React from 'react';

const InsightsMap = ({ data }: { data: any[] }) => {
    return (
        <div>
        <h2>Noticias por país</h2>
        <ul>
            {data.map((news, index) => (
            <li key={index}>
                <strong>{news.country}</strong>: {news.headline}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default InsightsMap;