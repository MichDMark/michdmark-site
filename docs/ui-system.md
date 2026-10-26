# UI System

## Decisión

La UI del proyecto se estandariza sobre Mantine y los iconos sobre `@tabler/icons-react`.

No se usan Tailwind CSS, shadcn/ui, Aceternity UI, Chakra UI, lucide-react ni react-icons como base visual del proyecto.

## Reglas

- Usar componentes de `@mantine/core` para layout, navegación, botones, cards, badges, textos y superficies.
- Usar iconos de `@tabler/icons-react` para iconografía de UI y marcas sociales.
- Mantener el tema en `lib/theme.ts`.
- Mantener tokens, tipografía, composición responsive y accesibilidad global en `app/globals.css`; usar clases semánticas para composiciones y efectos compartidos.
- Evitar clases utilitarias. Usar props de Mantine para layout sencillo y clases semánticas cuando una composición necesite estilos responsive o pseudoestados.
- Usar el color `brand` del theme para el acento rojo.
- Mantener el sitio en dark mode por defecto.
- Respetar foco visible y `prefers-reduced-motion`; los detalles cian son decorativos y el rojo conserva la identidad de marca.
- Bitácora, Proyectos y Gadgets son colecciones autónomas con propósitos distintos, no partes de un mismo proyecto. Bitácora tiene voz narrativa de blog personal; las referencias entre secciones son opcionales y discretas.
- En Proyectos y Gadgets, mantener la información completa en una sola vista sin pestañas ni acordeones. El HTML estático inicial debe ser escaneable para personas y agentes y usar estructura semántica (`article`, `dl`, `ul`, `ol`, `pre` y `code`). Los filtros solo ayudan a recorrer el contenido.

## Componentes de dominio

Los componentes en `components/` pueden existir cuando representan conceptos del sitio o del sistema PCB:

- `Navbar`, `MobileMenu`, `Logo` y `Footer`: navegación compartida y marco del sitio.
- `PcbBackground`, `PcbCircuit` y `CircuitDetails`: placa base, ruteo de señales medido en patas reales y encapsulados IC.
- `BitacoraExplorer` y `PostCard`: artículos narrativos con fecha, etiquetas, extracto, búsqueda y filtros sencillos para Bitácora (`/blog`).
- `ProjectWorkbench` y `ProjectCard`: proyectos autónomos con métricas, arquitectura completa, una traza de ejemplo y todos sus hitos visibles; las referencias opcionales aparecen al pie (`/projects`).
- `GadgetsRack`: fichas técnicas autónomas por estación con especificaciones, fortalezas, límites y recetas visibles y copiables; las referencias opcionales aparecen al pie (`/setup`).
- `SocialLinks` y `SectionHeader`: cabeceras y enlaces reutilizables.

Internamente deben componerse con Mantine y mantener el lenguaje visual PCB oscuro con acentos rojo y cian.

## Iconos

El estándar actual usa `@tabler/icons-react` como única fuente de iconos.

- Importar solo los iconos necesarios.
- Mantener tamaños entre `14` y `20` en controles compactos.
- Usar `stroke` entre `1.6` y `2` para iconos de navegación/acciones.
- No mezclar con `lucide-react`, `react-icons` u otra librería sin documentar una decisión nueva.
