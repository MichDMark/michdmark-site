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

## Revisión de seguridad de dependencias (2026-10)

- Se actualizaron `next` y `eslint-config-next` conjuntamente de `16.3.2` a `16.3.8`, conservando la misma versión mayor y la alineación requerida por la configuración ESLint. `vitest` pasó de `4.1.10` a `4.1.11`, que corrige el advisory GHSA-82fw-gwwq-j7x9. El refresco de versiones transitivas compatibles actualizó además `sharp` a `0.35.5` y `js-yaml` a `3.15.2`/`4.3.2`, entre otros.
- `npm audit --audit-level=high` sigue encontrando cinco entradas altas, todas originadas por GHSA-vfj7-8cjw-p6xm (`braces` <= `3.0.3`), en la cadena de desarrollo `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob@3.3.1` → `micromatch@4.0.8` → `braces@3.0.3`. El registro npm consultado solo publica `braces@3.0.3` en la rama 3.x; no hay una versión corregida compatible para aplicar como override. npm sugiere bajar `eslint-config-next` a `14.2.35`, lo que desalinearía el lint de Next 16; no se aplicó esa degradación ni un override a una versión inexistente. El hallazgo afecta tooling de desarrollo/lint, no una dependencia runtime del export estático.
- En CI son gates bloqueantes `npm audit --audit-level=critical` para todo el árbol y `npm audit --omit=dev --audit-level=high` para dependencias de producción. El `npm audit --audit-level=high` completo se ejecuta también, pero es informativo temporalmente: su salida íntegra queda en los logs y los advisories high de desarrollo deben revisarse manualmente. Esta política deja de ser necesaria cuando exista un parche compatible: entonces se actualizará el árbol y el audit high completo volverá a ser bloqueante. Cualquier advisory high/crítico que aparezca en producción ya bloquea el despliegue.
- Revisar este advisory y los nuevos hallazgos high de desarrollo al actualizar Next/eslint-config-next. No bajar `eslint-config-next` de forma aislada respecto de Next.
- npm `10.9.4` sobre Node `22.22.1` falló al resolver la actualización de Vitest con `TypeError: Cannot read properties of null (reading 'edgesOut')` (Arborist). Se regeneró el lockfile y se verificó después `npm ci` sin `--legacy-peer-deps`, que finalizó correctamente. CI continúa usando Node 20; el error corresponde al cliente local utilizado durante la resolución, no a una dependencia que requiera el flag.
