# Mantenimiento

## Checks antes de publicar

```bash
npm audit
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
- Mantener los tests enfocados en estructura, datos y comportamiento estable.
- Revisar que los links externos en `data/social.ts` y `data/projects.ts` sigan activos.
- Confirmar que el build siga generando rutas estáticas compatibles con GitHub Pages.

## Decisiones actuales

- El sitio se mantiene como proyecto estático.
- El contenido se edita directamente en archivos del repo.
- No se agregan servicios externos salvo que exista una necesidad clara.
