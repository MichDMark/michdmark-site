# UI System

## Decisión

La UI del proyecto se estandariza sobre Mantine y los iconos sobre `@tabler/icons-react`.

No se usan Tailwind CSS, shadcn/ui, Aceternity UI, Chakra UI, lucide-react ni react-icons como base visual del proyecto.

## Reglas

- Usar componentes de `@mantine/core` para layout, navegación, botones, cards, badges, textos y superficies.
- Usar iconos de `@tabler/icons-react` para iconografía de UI y marcas sociales.
- Mantener el tema en `lib/theme.ts`.
- Mantener estilos globales mínimos en `app/globals.css`.
- Evitar clases utilitarias para layout o color; preferir props de Mantine y `style` solo para efectos puntuales.
- Usar el color `brand` del theme para el acento rojo.
- Mantener el sitio en dark mode por defecto.

## Componentes de dominio

Los componentes en `components/` pueden existir cuando representan conceptos del sitio:

- `Navbar`
- `MobileMenu`
- `PostCard`
- `ProjectCard`
- `SocialLinks`
- `SectionHeader`

Internamente deben componerse con Mantine.

## Iconos

El estándar actual usa `@tabler/icons-react` como única fuente de iconos.

- Importar solo los iconos necesarios.
- Mantener tamaños entre `14` y `20` en controles compactos.
- Usar `stroke` entre `1.6` y `2` para iconos de navegación/acciones.
- No mezclar con `lucide-react`, `react-icons` u otra librería sin documentar una decisión nueva.
