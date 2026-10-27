# Project Overview

## Propósito

Sitio personal de Mich DMark sobre tecnología accesible y el uso de agentes en software y hardware. Las secciones de blog, proyectos y gadgets están preparadas para crecer con contenido nuevo.

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
- Projects: `data/projects.ts`
- Gadgets/setup: `data/gadgets.ts`
- Redes/contacto: `data/social.ts`

La navegación pública consta de Inicio (`/`), About me (`/about`), Blog (`/blog`), Projects (`/projects`) y Gadgets (`/setup`). El alcance editorial, los modelos diferenciados por sección y las convenciones para conectar contenido se documentan en `editorial-scope.md`.

El export estático incluye `/llms.txt`, un índice Markdown con enlaces absolutos a las secciones y a las entradas, proyectos y gadgets disponibles. Las colecciones vacías se indican como «Próximamente».

## Despliegue

El proyecto se exporta como sitio estático con `next build` y publica `out/` mediante GitHub Pages.

La configuración relevante vive en:

- `next.config.ts`
- `.github/workflows/deploy.yml`

## URL pública

El sitio está desplegado en GitHub Pages y responde bajo el dominio propio `https://michdmark.com/`. El build de Actions define `NEXT_PUBLIC_SITE_URL=https://michdmark.com`; ese mismo dominio es el valor por defecto para metadata, sitemap y robots al trabajar localmente. La variable puede sobrescribirse para una vista previa.

El dominio personalizado se sirve desde la raíz. `basePath` y `assetPrefix` permanecen vacíos para que las rutas y los recursos del export estático usen esa raíz.
