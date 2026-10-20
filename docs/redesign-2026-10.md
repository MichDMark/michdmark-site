# Muestra visual del rediseño (2026-10)

## Red editorial conectada en las cinco páginas (UI-003)

- Inicio sustituye el cuadro separado de áreas de interés por una composición editorial donde las conexiones llegan a los bloques reales. «Mich DMark» conecta con About me, Redes y Contacto; Blog permanece como acceso destacado y Proyectos/Gadgets siguen accesibles.
- About conecta su presentación con Redes y Contacto. Blog, Proyectos y Gadgets conectan sus encabezados con el bloque real de contenido o estado vacío; cuando haya una colección, se conectará su contenedor real sin agregar nodos por tarjeta.
- Las líneas decorativas se dibujan entre puertos de los bloques, sin cruzar texto ni controles. En escritorio conectan origen y destinos en una disposición amplia; en móvil los bloques fluyen en una columna con ramas visibles. Los enlaces y grupos conservan su estructura real, datos y destinos actuales.
- La señal recorre líneas base tenues y continuas. Hover, foco y presión resaltan el destino y su conexión; el texto permanece quieto. Las conexiones son `aria-hidden`, no interceptan eventos y desaparecen como animación bajo `prefers-reduced-motion`, dejando líneas estáticas.
- El alcance vigente abarca Inicio, About, Blog, Proyectos y Gadgets con un componente común. Las cinco rutas reciben el mismo lenguaje visual, adaptado a sus bloques editoriales reales.

## Objetivo

La primera muestra UI-001 se limitó a Inicio, navegación compartida y acceso al Blog. UI-003 extiende ahora la composición conectada a las cinco páginas públicas según la decisión del usuario. Se conserva la identidad roja/cian y la inspiración de `demo_agent_control_room` en señales luminosas sobre conexiones y marcos con glow de interacción. La referencia inspira efectos, no contenido ni estructura: el sitio sigue siendo un blog/portafolio, sin paneles de métricas ni estados ficticios.

## Decisiones visuales

- Mantener el rojo como identidad y usar cian solo en bordes, líneas, focos y metadatos. Usar menta o ámbar únicamente si existe un estado real que lo justifique; no crear indicadores de disponibilidad ficticios.
- Crear profundidad con CSS local: gradientes discretos, trama técnica de baja opacidad y superficies oscuras. No añadir fuentes, imágenes ni recursos remotos, ni dependencias.
- Usar titulares sans serif y etiquetas técnicas monospace en segundo plano. Mantener tamaños de lectura cómodos, navegación táctil y foco visible.
- En la muestra inicial, animar la entrada de Inicio y Blog, destacar el acceso al Blog y dar respuesta visible de hover, foco y presión a navegación, acciones, logo y enlaces sociales. La navegación sigue funcionando como enlaces normales y admite teclado, táctil, nueva pestaña, atrás/adelante, anclas y navegación rápida.
- La decisión vigente para las cinco páginas está descrita en «Red editorial conectada en las cinco páginas»: las conexiones forman parte de la composición real de contenido, no de un cuadro independiente de áreas de interés.
- Mantener la lectura estable: sin movimiento continuo en texto, parallax, destellos intensos ni efectos que bloqueen controles.
- Mantener redes y contacto desde `data/social.ts`. En About me, conservar únicamente una presentación breve y esos enlaces; no añadir biografía, métricas ni estados.
- Mantener vacíos Blog, Proyectos y Gadgets mientras no tengan datos, con “Contenido en preparación” y sus componentes/cards funcionales para contenido futuro.

## Muestra inicial y accesibilidad

- Alcance inicial de UI-001: Inicio, navegación compartida y listado vacío del Blog. La ampliación UI-003 aplica la composición conectada a las cinco rutas públicas; no cambia Footer ni navegación compartida.
- La referencia local de solo lectura es `/Users/michdmark/Documents/proyectos/taller_agentes/demo_agent_control_room`, en particular `src/index.css` y `src/components/AgentNetwork.tsx`. Se adapta a CSS/SVG nativo, Mantine y Tabler.
- Esta decisión sustituye el acuerdo anterior de mantener la red de disciplinas como cuadro separado. mich-lead completó la revisión visual de UI-001 y la revisión visual de UI-003.

- Mantener las cinco rutas existentes y preservar sus propósitos y metadata/canonicals. UI-003 integra las conexiones en las cinco sin cambiar su contenido editorial acordado.
- La terminología pública del sitio usa «agentes» para referirse a este tema.
- Mantener Next App Router, Mantine, Tabler Icons, export estático y compatibilidad con GitHub Pages.
- Usar un `h1` por página, landmarks semánticos, enlaces reales, contraste suficiente y targets táctiles. No debe haber overflow horizontal.
- Respetar `prefers-reduced-motion` en CSS y en el Drawer de navegación; desactivar realmente todas las animaciones, también las señales SVG. La composición completa debe conservarse sin movimiento.
- El cambio se limita a UI, estilos y esta documentación. No reescribir contenido personal fuera de la simplificación solicitada.

## Validación histórica de UI-001

- `npm run check` aprobado después de UI-001-R1: lint, 6 pruebas, TypeScript y export estático.
- Chromium 153 sobre el export estático local: 16 comprobaciones aprobadas, 0 fallos y 0 errores de página. Incluyeron geometría y overflow en 320, 390, 768 y 1440 px, los mismos anchos con movimiento reducido, interacciones de hover/foco/presión, navegación cliente e historial, clic modificado, menú táctil y uso sin JavaScript. También se verificaron h1 y ancho en otras tres rutas.
- mich-lead inspeccionó las capturas de UI-001 y confirmó las tres conexiones visibles de aquel cuadro. UI-003 sustituye ese cuadro por conexiones integradas en los bloques reales.

## Validación de UI-003

- mich-lead inspeccionó capturas de las cinco páginas y completó 36 comprobaciones de matriz en Chromium 153 a 320, 390, 768, 1024 y 1440 px. Incluyeron `prefers-reduced-motion` en las cinco rutas, hover/foco exclusivo, resize, navegación cliente, teclado e historial, y contenido SSR sin JavaScript.
- Se añadieron 4 comprobaciones dirigidas en Inicio y About a 390 y 1440 px, con hover/foco/presión: las ramas vecinas conservaron exactamente la opacidad y el filtro de reposo y los puertos permanecieron alineados. Total: 40 comprobaciones, 0 fallos y 0 errores JavaScript. mich-review revisa técnicamente la implementación; la aprobación estética del usuario queda pendiente.
- `npm run check` aprobado: lint, 25 pruebas, TypeScript y export estático de las cinco rutas. `git diff --check` aprobado.
