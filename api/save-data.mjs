import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    // Verificación: Asegurarse de que los datos son un array antes de guardar.
    if (!Array.isArray(data)) {
      throw new Error('Los datos recibidos no son un array válido.');
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
    return res.status(500).json({ success: false, message: `Error interno del servidor: ${error.message}` });
  }
}