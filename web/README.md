# WoW Register — Web (Next.js + React)

Web pública del reino: estadísticas, personajes, hermandades, objetos e información del servidor (SOAP).

## Requisitos

- Node.js 18+
- Backend (Spring Boot) corriendo en `http://localhost:8080` o configurar `NEXT_PUBLIC_API_URL`

## Desarrollo

```bash
cd web
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Las peticiones a `/api/*` se reescriben al backend (por defecto `http://localhost:8080`).

## Variables de entorno

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base del backend | `http://localhost:8080` |

## Build y producción

```bash
npm run build
npm run start
```

## Rutas

- `/` — Inicio y estadísticas
- `/realms` — Listado de reinos
- `/characters` — Personajes (búsqueda y paginación)
- `/characters/[guid]` — Detalle de personaje
- `/guilds` — Hermandades
- `/guilds/[id]` — Detalle de hermandad
- `/items` — Catálogo de objetos
- `/items/[entry]` — Detalle de objeto
- `/server` — Estadísticas e información del emulador (SOAP)
