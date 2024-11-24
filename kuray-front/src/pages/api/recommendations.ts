import { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { city, maxt, mint, precipitation, description } = req.body;

    if (!city || !maxt || !mint || !precipitation) {
        return res.status(400).json({ error: 'La ciudad, temperatura máxima, temperatura mínima y precipitación son requeridas.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un experto en meteorología agrícola y análisis climático para cultivos.',
                    },
                    {
                        role: 'user',
                        content: `Proporciona recomendaciones detalladas y prácticas basadas en las condiciones climáticas reportadas para la ciudad '${city}' con los siguientes parámetros:
                                - Temperatura máxima: '${maxt}'°C
                                - Temperatura mínima: '${mint}'°C
                                - Precipitación: '${precipitation}' mm

                                Considera lo siguiente:
                                - descripción: '${description}'
                                - Sugerencias para optimizar el manejo de cultivos en estas condiciones.
                                - Cultivos más adecuados para este clima.
                                - Métodos para mitigar los riesgos climáticos, como heladas, sequías o exceso de lluvia.
                                - Consejos prácticos para agricultores con experiencia básica.
                                
                                Responde en un lenguaje sencillo y directo, con un máximo de 200 palabras y 1250 caracteres.`,
                    },
                ],
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error en la respuesta de OpenAI:', errorDetails);
            return res.status(500).json({ error: 'Error al obtener la respuesta de OpenAI.', details: errorDetails });
        }

        const data = await response.json();
        const recommendations = data.choices[0]?.message?.content?.trim();
        res.status(200).json({ recommendations });
    } catch (error) {
        console.error('Error interno:', error);
        res.status(500).json({ error: 'Error interno del servidor.', details: error });
    }
}
