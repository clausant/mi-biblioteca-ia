# Mi Biblioteca IA

PoC de un segundo cerebro personal/corporativo basado en documentos enriquecidos con IA.

## Arquitectura objetivo

Google Drive / fuentes documentales → pipeline de procesamiento IA → Supabase (metadata, chunks y vectores) → Next.js → Vercel.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Copiar `.env.example` a `.env.local` y configurar Supabase.

## Próximas etapas

1. Crear modelo de datos en Supabase con pgvector.
2. Ingestar documentos desde Drive.
3. Extraer texto y metadata.
4. Generar chunks y embeddings.
5. Implementar búsqueda semántica.
6. Implementar chat RAG con referencias a las fuentes.
