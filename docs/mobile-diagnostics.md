# Diagnóstico de pantalla móvil

El panel temporal de Home permite copiar medidas del navegador para revisar diferencias de viewport y responsive. No envía datos a ningún servidor.

Ábrelo en desarrollo con `http://localhost:3000/?diagnostico=1` o, tras publicar una versión que incluya el componente, en `https://michdmark.com/?diagnostico=1`. Solo se activa cuando el parámetro `diagnostico` vale exactamente `1`; sin él no muestra interfaz ni instala observadores de tamaño.

El reporte incluye la ruta sin query, user agent, dimensiones interiores y del documento, dimensiones de pantalla, `devicePixelRatio`, `visualViewport`, meta viewport, breakpoints de 800/840 px, número de columnas resueltas, cantidad de cuadros DOM por fila y el valor crudo de `gridTemplateColumns`, ancho de scroll y URLs de hojas CSS propias. No incluye cookies, almacenamiento ni dirección IP. Usa **Copiar reporte**; si el navegador no permite acceso al portapapeles, el reporte queda visible y seleccionable para copiarlo manualmente. **Actualizar** vuelve a medir y limpia cualquier mensaje anterior de copia. **Cerrar** retira el panel y sus listeners; redimensionar o rotar actualiza las medidas mientras está abierto.

El panel mide el navegador donde se carga. No diagnostica DNS ni corrige por sí mismo problemas de conexión o de diseño. Para medir producción se necesita publicar primero una versión con esta herramienta.

Para retirarlo después, elimina el import y montaje en `app/page.tsx`, `components/ViewportDiagnostics.tsx`, la entrada de `docs/README.md` y este archivo `docs/mobile-diagnostics.md`. No requiere cambios de configuración ni dependencias.
