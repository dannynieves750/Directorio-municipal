import { put } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Solo se permite POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    
    // La clave es añadir { allowOverwrite: true }
    const blob = await put('directorio_empleados_barceloneta.json', JSON.stringify(data, null, 2), {
      access: 'public',
      allowOverwrite: true, // <-- ¡Esta es la línea importante!
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return new Response(JSON.stringify({ success: true, blob }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}