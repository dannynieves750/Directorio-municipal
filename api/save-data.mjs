// filepath: /api/save-data.mjs
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo se permite POST' });
  }

  try {
    const data = req.body; 
    
    const blob = await put('directorio_empleados_barceloneta.json', JSON.stringify(data, null, 2), {
      access: 'public',
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return res.status(200).json({ success: true, blob });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}