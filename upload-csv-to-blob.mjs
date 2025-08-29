// Script para convertir el CSV a JSON y subirlo a Vercel Blob
// Uso: node upload-csv-to-blob.js
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

// Cambia el nombre si tu archivo CSV tiene otro nombre
const csvPath = path.join(process.cwd(), 'public', 'directorio_empleados_barceloneta.csv');
const jsonBlobName = 'directorio_empleados_barceloneta.json';

function csvToJson(csv) {
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i] ? values[i].trim() : '';
    });
    return obj;
  });
}

async function main() {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const jsonData = csvToJson(csv);
  await put(jsonBlobName, JSON.stringify(jsonData), {
    access: 'public',
    contentType: 'application/json',
  });
  console.log('Archivo JSON subido correctamente a Vercel Blob:', jsonBlobName);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
