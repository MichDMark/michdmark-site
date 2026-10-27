# AGENTS.md

Guía para agentes que trabajen en este proyecto.

## Contexto del proyecto

- Blog personal y portafolio estático de Mich DMark, versión 2.0.0.
- Stack: Next.js App Router, TypeScript, Mantine y Tabler Icons.
- Despliegue: GitHub Pages usando `output: "export"`.
- No hay backend, base de datos, CMS ni autenticación.
- El contenido vive en Markdown y archivos TypeScript locales.
- Blog (`/blog/`) reúne narraciones Markdown; Projects (`/projects/`) presenta sistemas con métricas, bloques, traza y evolución en una vista; Gadgets (`/setup/`) reúne fichas con especificaciones, límites y snippets copiables en una vista. Son colecciones autónomas.
- Los títulos principales son Blog, Projects, Gadgets, About me, Social y Contact; los textos descriptivos y el contenido editorial están en español.
- Zero-Hidden-Content: evitar pestañas o acordeones que oculten datos en el HTML inicial. El índice estático `/llms.txt` se genera con `app/llms.txt/route.ts` y `buildLlmsTxt` en `lib/site.ts`.
- El sistema visual usa una PCB oscura, acento rojo y cian decorativo: protagonismo en Inicio y calma editorial en `.circuit-module-content`, con artículos de hasta 68ch.
- Por `output: "export"`, mantener `app/blog/[slug]/page.tsx` solo cuando exista al menos un post en `content/posts/`.

## Objetivo técnico

Mantener el proyecto simple, rápido y fácil de editar. Evitar agregar infraestructura, servicios externos o abstracciones innecesarias.

## Comandos de validación

```bash
npm audit --audit-level=critical
npm audit --omit=dev --audit-level=high
npm audit --audit-level=high # reporte informativo de CI
npm run lint
npm run test
npx tsc --noEmit
npm run build
npm run check
```

El build genera la carpeta `out/` para GitHub Pages.
Los pendientes posteriores a la versión 2.0.0 están en `docs/roadmap.md`.

## Estructura relevante

- `app/`: rutas y layouts de Next.
- `components/`: componentes reutilizables de UI.
- `content/posts/`: posts del blog en Markdown.
- `data/`: datos editables para proyectos, gadgets y redes.
- `lib/`: utilidades y lectura de posts.
- `docs/`: documentación interna del proyecto.
- `drafts/`: notas editoriales locales ignoradas por Git, salvo su guía `README.md`.
- `.codex/` y `.agents/`: incluyen la skill `mich-editorial` para trabajar contenido desde el CLI o desde `drafts/`.

## Reglas de trabajo

- Mantener el sitio 100% estático.
- No introducir backend, base de datos, CMS ni llamadas runtime innecesarias.
- Preferir datos locales simples antes que nuevas capas de abstracción.
- Mantener textos visibles principalmente en español.
- Usar Mantine como única librería de UI y `@tabler/icons-react` como única librería de iconos.
- No introducir Tailwind, shadcn, Aceternity, Chakra, lucide-react ni react-icons sin documentar una decisión nueva.
- Antes de cerrar un cambio, correr audit, lint, tests, TypeScript y build cuando el cambio lo amerite.
- Usar `npm run check` como verificación completa del estado del proyecto.
- No reescribir contenido personal salvo correcciones puntuales de ortografía o consistencia.
- No hacer rediseños amplios sin documentar primero la intención en `docs/`.

## Criterios de cambios

- Para deuda técnica: cambios pequeños, verificables y con bajo riesgo.
- Para UI: usar componentes Mantine, iconos Tabler y respetar la estética actual oscura con acento rojo.
- Para contenido: preservar el tono personal del autor.
- Para dependencias: agregar solo si resuelven un problema concreto y no complican GitHub Pages.
