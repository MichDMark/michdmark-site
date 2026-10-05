# Intención del rediseño visual (2026-10)

## Objetivo

Evolucionar el sitio personal hacia una interfaz oscura, editorial y técnica, inspirada en la dirección visual AI Operations HUD del documento de referencia externo. Adaptar ese lenguaje a un sitio personal, sin copiar marcas o pantallas, ni convertir las páginas en un dashboard.

## Decisiones visuales

- Mantener el rojo como identidad y usar cian solo en bordes, líneas, focos y metadatos. Usar menta o ámbar únicamente si existe un estado real que lo justifique; no crear indicadores de disponibilidad ficticios.
- Crear profundidad con CSS local: gradientes discretos, trama técnica de baja opacidad y superficies oscuras. No añadir fuentes, imágenes ni recursos remotos, ni dependencias.
- Usar titulares sans serif y etiquetas técnicas monospace en segundo plano. Mantener tamaños de lectura cómodos, navegación táctil y foco visible.
- Rediseñar encabezado, navegación, footer y encabezados de sección como un sistema común, variando superficies y divisores para evitar tarjetas repetidas.
- En Inicio, simplificar el hero a “Mich DMark” y una frase factual sobre tecnología e IA aplicada a software y hardware. Añadir una constelación estática en HTML/CSS/SVG con las tres disciplinas reales; será decorativa y accesible sin depender del color ni de animación.
- Mantener redes y contacto desde `data/social.ts`. En About me, conservar únicamente una presentación breve y esos enlaces; no añadir biografía, métricas ni estados.
- Mantener vacíos Blog, Proyectos y Gadgets mientras no tengan datos, con “Contenido en preparación” y sus componentes/cards funcionales para contenido futuro.

## Alcance y accesibilidad

- Aplicar el nuevo lenguaje a las cinco rutas existentes: Inicio, About me, Blog, Proyectos y Gadgets. Preservar sus propósitos y metadata/canonicals.
- Mantener Next App Router, Mantine, Tabler Icons, export estático y compatibilidad con GitHub Pages.
- Usar un `h1` por página, landmarks semánticos, enlaces reales, contraste suficiente y targets táctiles. No debe haber overflow horizontal.
- Respetar `prefers-reduced-motion`; la composición debe conservarse sin animaciones. La red de disciplinas será estática.
- El cambio se limita a UI, estilos y esta documentación. No reescribir contenido personal fuera de la simplificación solicitada.
