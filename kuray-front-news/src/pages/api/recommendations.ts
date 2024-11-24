import { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { title, category, publish_date, insight,text } = req.body;

    if (!title || !publish_date) {
        return res.status(400).json({ error: 'El título y la fecha de publicación son requeridos.' });
    }

    // Si no hay categoría, asignar un valor predeterminado
    const safeCategory = category || "Noticia no clasificada";

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
                        content: 'Eres un analista experto en noticias agrícolas, económicas y políticas.',
                    },
                    {
                        role: 'user',
                        content: `Analiza la siguiente noticia y como agricultor que tanto me va a afectar o que medidas debo tomar:
                                Título: '${title}'
                                Categoría: '${safeCategory}'
                                Fecha: '${publish_date}'
                                Insight previo: '${insight || "No disponible"}'
                                Tomar en cuenta esta descripcion: '${text}'
                                Responde en 200 palabras como máximo.`,
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
