import { list } from '@vercel/blob';

const ALLOWED_ORIGIN = 'https://directorio-municipal.vercel.app';

export default async function handler(req, res) {
  // CORS - solo permitir el origen oficial
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const { blobs } = await list({
      prefix: 'directorio_empleados_barceloneta.json',
      limit: 1,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (blobs.length === 0) {
      return res.status(200).json([]);
    }

    const fileInfo = blobs[0];
    const response = await fetch(fileInfo.url);

    if (!response.ok) {
      throw new Error('Error al descargar el archivo.');
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error en la función get-data:', error);
    return res.status(200).json([]);
  }
}
