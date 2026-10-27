# Roadmap posterior a v2.0.0

## Telemetría propia en el Edge

- Diseñar un colector propio con Cloudflare Worker y D1 SQLite, sin cookies ni plataformas de analítica de terceros, para registrar visitas y origen de consulta.
- Capturar ruta visitada, referrer, UTM, ubicación aproximada en edge (país, región, ciudad y zona horaria mediante `request.cf`), dispositivo, sistema operativo, navegador y viewport.
- Contemplar las lecturas de `/llms.txt` por agentes mediante un mecanismo de registro en edge para esa ruta.
- Enviar datos desde el cliente estático con `navigator.sendBeacon`, configurando el destino mediante una variable de entorno.

## Contenido editorial inicial

- Publicar los primeros artículos en `content/posts/` y restaurar `app/blog/[slug]/page.tsx` cuando exista al menos un post.
- Publicar los primeros sistemas de Projects en `data/projects.ts`.
- Publicar las primeras fichas técnicas de Gadgets en `data/gadgets.ts`.

## Skills y herramientas editoriales

La skill `mich-editorial` está disponible en `.agents/skills/mich-editorial/` y `.codex/skills/mich-editorial/`. El flujo híbrido permite trabajar mediante conversación en CLI o notas locales en `drafts/`, ignoradas por Git salvo su guía.

- Crear herramientas para generar borradores de fichas para Projects y Gadgets.
- Ampliar la auditoría previa a publicar del índice `/llms.txt`.
- Preparar un checklist de despliegue estático en GitHub Pages.

## Mantenimiento técnico

- Retirar `patches/braces+3.0.3.patch` y `scripts/patch-braces.mjs` cuando se publique una versión de `braces` superior a 3.0.3 compatible con la cadena de ESLint y con una solución equivalente.
