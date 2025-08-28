import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const employees = req.body;
      await put('directorio_empleados_barceloneta.json', JSON.stringify(employees), {
        access: 'public',
        contentType: 'application/json',
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
