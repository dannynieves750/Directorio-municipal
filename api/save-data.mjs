import { put } from '@vercel/blob';

const ALLOWED_ORIGIN = 'https://directorio-municipal.vercel.app';

export default async function handler(req, res) {
  // CORS - solo permitir el origen oficial
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  }

  // Bloquear peticiones que no vengan del sitio oficial
  const origin = req.headers.origin;
  if (origin !== ALLOWED_ORIGIN) {
    return res.status(403).json({ success: false, message: 'Acceso denegado.' });
  }

  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false, message: 'Formato de datos inválido.' });
    }

    const dataString = JSON.stringify(data, null, 2);

    await put('directorio_empleados_barceloneta.json', dataString, {
      access: 'public',
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ success: true, message: 'Datos guardados correctamente.' });

  } catch (error) {
    console.error('Error al guardar los datos en el blob:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
}
