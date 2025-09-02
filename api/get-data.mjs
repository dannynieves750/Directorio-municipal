import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    // 1. Usar 'list' para encontrar el archivo por su nombre exacto.
    const { blobs } = await list({
      prefix: 'directorio_empleados_barceloneta.json',
      limit: 1, // Solo necesitamos un resultado, el archivo exacto.
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // 2. Verificar si el archivo existe.
    if (blobs.length === 0) {
      // Si no se encuentra, es la primera vez o se borró. Devolver una lista vacía.
      return res.status(200).json([]);
    }

    const fileInfo = blobs[0];

    // 3. Usar fetch para descargar el contenido desde la URL del archivo.
    const response = await fetch(fileInfo.url);

    if (!response.ok) {
      // Si la descarga falla por alguna razón.
      throw new Error(`Error al descargar el archivo del blob: ${response.statusText}`);
    }
    
    // 4. Convertir la respuesta a JSON y enviarla al cliente.
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error en la función get-data:', error);
    // Si ocurre cualquier error (listar, descargar, parsear), devolvemos una lista vacía
    // para que la aplicación no se rompa y pueda seguir funcionando.
    return res.status(200).json([]);
  }
}