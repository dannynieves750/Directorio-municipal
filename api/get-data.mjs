


import { get } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blob = await get('https://your-vercel-blob-storage-url/directorio_empleados_barceloneta.json');
      if (!blob) {
        return res.status(200).json([]);
      }
      const data = await blob.text();
      return res.status(200).json(JSON.parse(data));
    } catch (error) {
      return res.status(500).json({ error: 'Error al leer datos del blob.', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
