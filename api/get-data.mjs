// filepath: /api/get-data.mjs
import { get } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const blob = await get('directorio_empleados_barceloneta.json', {
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    
    if (!blob) {
      return res.status(200).json([]);
    }

    const data = await blob.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).json({ error: 'Error al leer datos del blob.', details: error.message });
  }
}