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

- `gray-matter` se sustituyó por `yaml@^2.9.1`; el cargador valida los campos del frontmatter y conserva el Markdown. Con ello se retiró la cadena moderada de `gray-matter`/`js-yaml`/`sprintf-js`. `yaml` implementa YAML 1.2 y no requiere dependencias de ejecución propias ([documentación oficial](https://eemeli.org/yaml/)).
- La auditoría completa posterior informa cinco entradas high y cero moderate (`npm audit --json`, código de salida 1); la auditoría de producción informa cero hallazgos (`npm audit --omit=dev --json`, código 0). Las cinco entradas son propagaciones del mismo advisory de `braces` (`GHSA-vfj7-8cjw-p6xm`), no cinco fallos independientes: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob@3.3.1` → `micromatch` → `braces@3.0.3`. Es tooling de lint/desarrollo y no código incluido como dependencia runtime del sitio exportado. El registro no ofrece una versión corregida compatible de `braces`; no se degradó Next/eslint ni se añadió un override especulativo. Consultar [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) y [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c).
- CI conserva sus gates: `npm audit --audit-level=critical` para todo el árbol y `npm audit --omit=dev --audit-level=high` para producción. El audit high completo continúa como reporte informativo hasta que haya un arreglo compatible; revisar este advisory al actualizar Next/eslint-config-next y mantener sus versiones alineadas.
- Se fija Node.js 24, línea LTS ([ciclo oficial de versiones](https://nodejs.org/en/about/previous-releases)), tanto en `.node-version` como en CI. npm 11 normalizó marcas peer y reubicó paquetes opcionales WASM del lockfile; no cambió paquetes directos fuera del reemplazo `gray-matter` → `yaml`. `npm ci --ignore-scripts` reprodujo la instalación sin flags de resolución especiales.
- `npm run dev` es el servidor de desarrollo; el proyecto usa export estático, por lo que no ofrece `npm start`/`next start`. `npm run build` genera `out/`; el README documenta una vista previa opcional con el servidor estático de Python 3.
- GitHub Pages sirve el sitio bajo el dominio propio confirmado `https://michdmark.com/`. El workflow establece `NEXT_PUBLIC_SITE_URL` en el job de build; el valor por defecto local es el mismo. El dominio usa la raíz, con `basePath` y `assetPrefix` vacíos. GitHub Pages no requiere un archivo `CNAME` para el workflow personalizado; no se alteran ajustes externos de Pages ni DNS.
