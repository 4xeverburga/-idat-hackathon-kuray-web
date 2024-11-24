import React from 'react';

const ViewSelector = ({ setView }: { setView: (view: string) => void }) => {
    return (
        <div>
        <label htmlFor="viewSelector">Selecciona la vista: </label>
        <select
            id="viewSelector"
            onChange={(e) => setView(e.target.value)}
            defaultValue="pests"
        >
            <option value="climate">Clima y recomendaciones</option>
            <option value="pests">Plagas</option>
            <option value="insights">Insights de exportación</option>
        </select>
        </div>
    );
};

export default ViewSelector; // Exportación por defecto