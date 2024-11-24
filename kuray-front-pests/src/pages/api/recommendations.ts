import { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { pest, region, date } = req.body;

    if (!pest || !region || !date) {
        return res.status(400).json({ error: 'La plaga, la región y la fecha son requeridas.' });
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
                        content: 'Eres un experto en agricultura y control de plagas.',
                    },
                    {
                        role: 'user',
                        content: `Proporciona recomendaciones detalladas y prácticas para combatir la plaga denominada '${pest}', reportada en la región '${region}' el día '${date}'. Toma en cuenta las condiciones climáticas y agrícolas típicas de esta región, como temperatura, humedad, temporadas de cultivo y los tipos de cultivos predominantes. Proporciona sugerencias que incluyan:
                                Métodos biológicos o naturales si son efectivos.
                                Uso de pesticidas o tratamientos químicos específicos, indicando los productos y dosis recomendadas.
                                Prácticas culturales o preventivas para controlar la propagación.
                                Consideraciones especiales para minimizar el impacto en el medio ambiente y los cultivos.
                                Responde en un lenguaje sencillo y directo, adecuado para agricultores con experiencia práctica. TODO EN 200 PALABRAS COMO MAXIMO Y 1250 LETRAS COMO MAXIMO`,
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
