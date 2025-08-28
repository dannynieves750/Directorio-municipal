# Directorio Municipal Barceloneta

Este proyecto es un directorio de empleados para el Municipio de Barceloneta, listo para ser desplegado en Vercel y conectado a Vercel Blob como base de datos en la nube.

## Estructura
- `index.html`: Interfaz principal, incluye todo el frontend y lógica JS.
- `directorio_empleados_barceloneta.csv`: Archivo CSV con los datos iniciales de empleados.
- `/api/get-data.js`: API para leer empleados desde Vercel Blob.
- `/api/save-data.js`: API para guardar empleados en Vercel Blob.

## Primer despliegue
- Si no hay datos en la nube, el sistema subirá automáticamente el CSV inicial a Vercel Blob.
- El frontend detecta si la base de datos está vacía y realiza la carga inicial.

## Requisitos para Vercel
- Añade la dependencia `@vercel/blob` en tu proyecto (Vercel lo instala automáticamente en serverless).
- El proyecto funciona como static + serverless API.

## Seguridad
- El sistema de login es básico y solo para uso interno municipal.
- No almacenes contraseñas reales ni datos sensibles en producción sin cifrado.

## Despliegue
1. Sube el proyecto a GitHub.
2. Conéctalo a Vercel y despliega.
3. El sistema funcionará automáticamente con Vercel Blob.

---

¿Dudas? Contacta a la Oficina de Sistemas de Información del Municipio de Barceloneta.
