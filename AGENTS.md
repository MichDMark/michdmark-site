# AGENTS.md

Guía para agentes que trabajen en este proyecto.

## Contexto del proyecto

- Blog personal y portafolio estático de Mich DMark.
- Stack: Next.js App Router, TypeScript, Mantine y Tabler Icons.
- Despliegue: GitHub Pages usando `output: "export"`.
- No hay backend, base de datos, CMS ni autenticación.
- El contenido vive en Markdown y archivos TypeScript locales.

## Objetivo técnico

Mantener el proyecto simple, rápido y fácil de editar. Evitar agregar infraestructura, servicios externos o abstracciones innecesarias.

## Comandos de validación

```bash
npm audit
npm run lint
npm run test
npx tsc --noEmit
npm run build
npm run check
```

El build genera la carpeta `out/` para GitHub Pages.

## Estructura relevante

- `app/`: rutas y layouts de Next.
- `components/`: componentes reutilizables de UI.
- `content/posts/`: posts del blog en Markdown.
- `data/`: datos editables para proyectos, gadgets y redes.
- `lib/`: utilidades y lectura de posts.
- `docs/`: documentación interna del proyecto.
- `.codex/`: espacio para configuración y futuras skills locales.

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
