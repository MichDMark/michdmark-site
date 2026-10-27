# Mantenimiento

## Checks antes de publicar

```bash
npm audit --audit-level=critical
npm audit --omit=dev --audit-level=high
npm audit --audit-level=high
npm run lint
npm run test
npx tsc --noEmit
npm run build
npm run check
```

## Mantenimiento recurrente

- Revisar que README y `docs/` sigan reflejando el estado real del proyecto.
- Mantener dependencias mínimas y eliminar paquetes que ya no se usen.
- Verificar que los posts tengan frontmatter completo.
- Mantener slugs de posts en minúsculas y sin espacios.
- Las colecciones de posts, proyectos y gadgets pueden estar vacías; las páginas deben mostrar su estado vacío editorial.
- Mantener los tests enfocados en estructura, datos y comportamiento estable.
- Revisar que los links externos en `data/social.ts` y `data/projects.ts` sigan activos.
- Confirmar que el build siga generando rutas estáticas compatibles con GitHub Pages.

## Decisiones actuales

- El sitio se mantiene como proyecto estático.
- El contenido se edita directamente en archivos del repo.
- No se agregan servicios externos salvo que exista una necesidad clara.

## Parche activo de braces y gates de CI

- `postinstall` ejecuta `scripts/patch-braces.mjs`, que aplica `patches/braces+3.0.3.patch` a `braces@3.0.3` para acotar la recursión. Requiere Git; si se instala con `--ignore-scripts`, ejecutar después `npm run postinstall`. Las pruebas comprueban que el parche esté activo.
- `npm audit --audit-level=high` informa cinco entradas high de desarrollo que propagan el mismo advisory de `braces` (`GHSA-vfj7-8cjw-p6xm`), porque el audit identifica la versión publicada aunque exista el parche local. La auditoría de producción informa cero hallazgos. Revisar el advisory y el parche al actualizar la cadena de ESLint.
- `.github/workflows/deploy.yml` bloquea hallazgos críticos en todo el árbol con `npm audit --audit-level=critical` y hallazgos high o críticos de producción con `npm audit --omit=dev --audit-level=high`. El audit high completo es informativo; CI también ejecuta `npm run check`.
- Usar Node.js 24 LTS, fijado en `.node-version` y en CI.
