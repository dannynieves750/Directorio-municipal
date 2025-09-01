import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo se permite POST' });
  }

  try {
    // El problema estaba aquí. `req.body` no contiene los datos directamente.
    // La forma correcta es leer el stream de la petición.
    const dataString = JSON.stringify(req.body);
    
    const blob = await put('directorio_empleados_barceloneta.json', dataString, {
      access: 'public',
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return res.status(200).json({ success: true, blob });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}