# Mich DMark

Sitio personal estático de Mich DMark, versión 2.0.0, construido con Next.js, TypeScript, Mantine y Tabler Icons.

El sitio explora tecnología accesible y el uso de agentes en software y hardware. Mantiene cinco secciones: Inicio, About me, Blog (`/blog`), Projects (`/projects`) y Gadgets (`/setup`). Cada colección tiene un modelo de datos e interacción propios sobre una arquitectura 100% estática (sin backend, base de datos ni CMS); el contenido vive en Markdown y datos locales de TypeScript.

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

La instalación requiere Git y aplica automáticamente el parche local de `braces` mediante `postinstall`. Si instalas con `--ignore-scripts`, ejecuta después `npm run postinstall` para aplicar esa protección. El alcance y mantenimiento del parche están documentados en [`docs/maintenance.md`](docs/maintenance.md).

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

La skill `mich-editorial` ayuda a crear contenido conversando en el CLI o a partir de notas locales en `drafts/`. Esos archivos quedan fuera de Git; consulta [la guía de borradores](drafts/README.md).

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
Con `output: "export"`, habilita `app/blog/[slug]/page.tsx` cuando exista al menos un archivo `.md` en `content/posts/`; mientras no haya publicaciones, la ruta dinámica permanece retirada.

### Datos editables

- Projects: `data/projects.ts`
- Gadgets/setup: `data/gadgets.ts`
- Redes sociales y contacto: `data/social.ts`

El alcance editorial actual y el criterio para relacionar contenido en el futuro están descritos en [`docs/editorial-scope.md`](docs/editorial-scope.md).

El build genera [`/llms.txt`](https://michdmark.com/llms.txt) con enlaces absolutos y un índice de las colecciones disponibles para lectura por agentes. Cuando una colección está vacía, el archivo indica «Próximamente».

Los pendientes posteriores a esta versión se describen en [`docs/roadmap.md`](docs/roadmap.md).

## Vista previa estática

El proyecto requiere Node.js 24, fijado en `.node-version`. `npm run dev` inicia el entorno de desarrollo; `npm run build` genera el export estático en `out/`. Para previsualizar ese export con Python 3:

```bash
python3 -m http.server 4175 --bind 127.0.0.1 --directory out
```

## Despliegue

El workflow `.github/workflows/deploy.yml` bloquea hallazgos críticos en todo el árbol y high/críticos en dependencias de producción. También ejecuta `npm audit --audit-level=high` como reporte informativo en logs para revisar manualmente vulnerabilidades high de desarrollo. Después ejecuta `npm run check` y publica la carpeta `out/` en GitHub Pages. La política y el hallazgo high conocido están documentados en [`docs/maintenance.md`](docs/maintenance.md).

La configuración de Next usa `output: "export"` y `trailingSlash: true` para mantener el sitio compatible con Pages.

El sitio se publica en GitHub Pages bajo el dominio propio `https://michdmark.com/`. Metadata, sitemap y robots usan `NEXT_PUBLIC_SITE_URL`; el workflow define ese dominio y el valor por defecto local también es `https://michdmark.com`.
