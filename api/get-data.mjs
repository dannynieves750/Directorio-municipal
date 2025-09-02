import { get } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const blob = await get('directorio_empleados_barceloneta.json', {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!blob) {
      // El blob no existe, devuelve un array vacío.
      return res.status(200).json([]);
    }

    // Lee el contenido como texto para verificar si está vacío o corrupto.
    const textContent = await blob.text();

    if (!textContent) {
      // El archivo está vacío, devuelve un array vacío.
      return res.status(200).json([]);
    }

    try {
      // Intenta convertir el texto a JSON.
      const data = JSON.parse(textContent);
      return res.status(200).json(data);
    } catch (parseError) {
      // Si falla el parseo, el JSON está corrupto.
      console.error('Error al parsear JSON del blob:', parseError);
      // Devuelve un array vacío para que la app no se rompa.
      return res.status(200).json([]);
    }

  } catch (error) {
    console.error('Error al obtener datos del blob:', error);
    return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
  }
}