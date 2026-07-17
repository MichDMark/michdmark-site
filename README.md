# Mich DMark

Blog personal y portafolio estático construido con Next.js, TypeScript, Mantine y Tabler Icons.

El sitio está pensado para mostrar redes sociales, artículos, proyectos personales y gadgets/setup. No usa backend, base de datos ni CMS; el contenido vive en archivos Markdown y datos locales de TypeScript.

## Stack

- Next.js App Router con export estático.
- TypeScript.
- Mantine como librería de UI.
- Tabler Icons como librería de iconos.
- Markdown para posts del blog.
- GitHub Pages para despliegue.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

```bash
npm audit
npm run lint
npm run test
npx tsc --noEmit
npm run build
npm run check
```

## Contenido

### Posts

Crea un archivo `.md` en `content/posts/` con este frontmatter:

```yaml
---
title: "Título"
description: "Descripción corta"
date: "YYYY-MM-DD"
tags: ["Blog", "Tech"]
---
```

El slug se genera a partir del nombre del archivo.

### Datos editables

- Proyectos: `data/projects.ts`
- Gadgets/setup: `data/gadgets.ts`
- Redes sociales y contacto: `data/social.ts`

## Despliegue

El workflow `.github/workflows/deploy.yml` ejecuta `npm ci`, `npm audit --audit-level=high`, `npm run check` y publica la carpeta `out/` en GitHub Pages.

La configuración de Next usa `output: "export"` y `trailingSlash: true` para mantener el sitio compatible con Pages.

La URL pública para metadata, sitemap y robots se configura con `NEXT_PUBLIC_SITE_URL`. Si no existe, el fallback es `https://michdmark.github.io/michdmark-site`.
