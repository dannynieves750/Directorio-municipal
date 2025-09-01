import { get } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { url } = request;
    const blob = await get('directorio_empleados_barceloneta.json', {
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    
    if (!blob) {
      return new Response(
        JSON.stringify([]),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await blob.text();
    return new Response(
      data,
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error al leer datos del blob.', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}