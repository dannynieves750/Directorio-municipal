import { get } from '@vercel/blob';

export default async function handler(req, res) {
  // Se elimina la validación estricta del método para diagnosticar y resolver el problema en Vercel.
  // La función ahora se centrará únicamente en obtener los datos.

  try {
    const blob = await get('directorio_empleados_barceloneta.json', {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!blob) {
      // Si el blob no existe, es la primera vez que se ejecuta.
      // Devolver un array vacío es seguro. El frontend se encargará.
      return res.status(200).json([]);
    }

    const data = await blob.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error al obtener los datos del blob:', error);
    // Devuelve un mensaje de error claro si algo falla en el servidor.
    return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
  }
}