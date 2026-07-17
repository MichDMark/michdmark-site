# Project Overview

## Propósito

Sitio personal para centralizar redes sociales, artículos, proyectos personales, gadgets y contenido tech de Mich DMark.

## Stack

- Next.js App Router.
- TypeScript.
- Mantine como librería de UI.
- Tabler Icons como librería de iconos.
- Markdown para posts.
- GitHub Pages como hosting estático.

## Límites del proyecto

- Sin backend.
- Sin base de datos.
- Sin CMS.
- Sin autenticación.
- Sin funciones server-side dependientes de runtime.

## Contenido editable

- Posts: `content/posts/`
- Proyectos: `data/projects.ts`
- Gadgets/setup: `data/gadgets.ts`
- Redes/contacto: `data/social.ts`

## Despliegue

El proyecto se exporta como sitio estático con `next build` y publica `out/` mediante GitHub Pages.

La configuración relevante vive en:

- `next.config.ts`
- `.github/workflows/deploy.yml`

## URL pública

La URL pública se lee desde `NEXT_PUBLIC_SITE_URL`. Si no existe, el fallback actual es `https://michdmark.github.io/michdmark-site`.

Si se usa dominio custom en GitHub Pages, configurar `NEXT_PUBLIC_SITE_URL` con ese dominio para que metadata, sitemap y robots usen URLs canónicas correctas.
