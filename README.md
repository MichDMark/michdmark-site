# Mich DMark

Sitio personal estático de Mich DMark, construido con Next.js, TypeScript, Mantine y Tabler Icons.

El sitio explora tecnología accesible e inteligencia artificial aplicada a software y hardware. Mantiene cinco secciones: Inicio, About me, Blog, Proyectos y Gadgets. El contenido está en construcción y las colecciones pueden permanecer vacías. No usa backend, base de datos ni CMS; el contenido vive en Markdown y datos locales de TypeScript.

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
npm audit --audit-level=critical
npm audit --omit=dev --audit-level=high
npm audit --audit-level=high # reporte completo; revisar manualmente hallazgos high de desarrollo
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

El alcance editorial actual y el criterio para relacionar contenido en el futuro están descritos en [`docs/editorial-scope.md`](docs/editorial-scope.md).

## Despliegue

El workflow `.github/workflows/deploy.yml` bloquea hallazgos críticos en todo el árbol y high/críticos en dependencias de producción. También ejecuta `npm audit --audit-level=high` como reporte informativo en logs para revisar manualmente vulnerabilidades high de desarrollo. Después ejecuta `npm run check` y publica la carpeta `out/` en GitHub Pages. La política y el hallazgo high conocido están documentados en [`docs/maintenance.md`](docs/maintenance.md).

La configuración de Next usa `output: "export"` y `trailingSlash: true` para mantener el sitio compatible con Pages.

La URL pública para metadata, sitemap y robots se configura con `NEXT_PUBLIC_SITE_URL`. Si no existe, el fallback es `https://michdmark.github.io/michdmark-site`.
