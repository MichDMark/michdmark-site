# Alcance editorial y modelos de sección

## Enfoque

El sitio de Mich DMark reúne tres colecciones autónomas con propósitos distintos. Bitácora es el espacio narrativo donde el autor cuenta ideas, historias y aprendizajes; Proyectos documenta sistemas completos; Gadgets reúne fichas de herramientas. No son partes de un mismo proyecto. Las referencias entre ellas son opcionales y discretas.

Proyectos y Gadgets presentan su información completa en una sola vista, sin pestañas ni acordeones. El HTML estático inicial mantiene estructura semántica para lectura humana y de agentes, mientras que los filtros y la búsqueda ayudan a recorrer el contenido.

La terminología pública del sitio usa «agentes» para hablar de este tema; mantener esa elección en páginas, metadata y textos compartidos.

## Páginas e identidad por sección

La navegación tiene cinco destinos públicos:

| Página | Ruta | Identidad y propósito |
| --- | --- | --- |
| Inicio | `/` | Presentar a Mich DMark y conectar el mapa general del sitio sobre la placa PCB. |
| About me | `/about` | Explicar brevemente el enfoque personal y ofrecer redes y contacto. |
| Bitácora | `/blog` | Blog personal de ideas, historias, aprendizajes y tecnología explicada con claridad. Incluye búsqueda y filtros sencillos por etiqueta. |
| Proyectos | `/projects` | Colección autónoma de sistemas: cada pieza presenta sus métricas, bloques de arquitectura, una traza de ejemplo y los hitos de evolución. |
| Gadgets | `/setup` | Colección autónoma de fichas: cada herramienta presenta estado, veredicto, especificaciones, ventajas, límites y recetas visibles y copiables. |

> Nota de ruta: La sección **Bitácora** conserva la ruta `/blog/` y `/blog/<slug>/` por simplicidad técnica y estabilidad de enlaces, cambiando su nombre visible en navegación, portada y encabezados.

Mientras una colección esté vacía, su página explica su propósito y muestra el mensaje «Contenido en preparación» sin tarjetas vacías ni apariencia de error.

## Modelos de información por sección

### 1. Bitácora (`content/posts/*.md` y `lib/posts.ts`)

Es un blog personal escrito en Markdown. El frontmatter conserva solo los datos editoriales y, cuando aporta contexto, referencias opcionales a otras secciones:

- Campos obligatorios: `title`, `description`, `date` (`YYYY-MM-DD`).
- Campos opcionales:
  - `tags`: lista de etiquetas temáticas.
  - `relatedProjects` y `relatedGadgets`: listas opcionales de identificadores estables (`id`). Solo se muestran como enlaces de texto discretos al final de la entrada.

La exportación estática de Next.js requiere al menos un parámetro para generar `app/blog/[slug]/page.tsx`. Si en el futuro se vacían todos los archivos `.md` de `content/posts/`, debe retirarse temporalmente `app/blog/[slug]/page.tsx` hasta volver a tener al menos una entrada publicada.

### 2. Proyectos (`data/projects.ts`)

Cada proyecto se modela como un **sistema desarmable** en lugar de un texto plano:

- Identificación y contexto: `id`, `name`, `tagline`, `description`, `domain` (`"software" | "hardware" | "hibrido" | "agentes"`), `status` (`"produccion" | "prototipo" | "experimento" | "archivado"`), `stack` y `url`.
- `metrics`: pares `{ label, value }` con mediciones o datos concretos del sistema.
- `blocks`: nodos del sistema (`id`, `label`, `role`: `"input" | "core" | "output" | "storage"`, `tech`, `detail`) visibles en cuadrícula dentro de la arquitectura.
- `simulation`: escenarios pregrabados (`id`, `inputLabel`, `summary`, `trace`, `output`); el primer escenario se muestra como ejemplo real en un bloque `<pre><code>`.
- `milestones`: hitos de iteración (`version`, `title`, `outcome`, `status`: `"failed" | "iterated" | "shipped"`) visibles en una lista ordenada.
- `gadgetIds` y `relatedPostSlug`: referencias opcionales hacia `/setup/` y `/blog/`, mostradas al pie de la ficha.

### 3. Gadgets (`data/gadgets.ts`)

Cada herramienta de software o hardware se presenta como un **Datasheet operativo** dentro de su categoría (`GadgetCategory`), con filtros sencillos por estación:

- Ficha técnica (`Gadget`): `id`, `name`, `description`, `role`, `status` (`"diario" | "por-proyecto" | "en-pruebas" | "reemplazado"`), `verdict` (`"imprescindible" | "recomendado" | "situacional"`), `specs` (`{ label, value }[]`), `pros` (`string[]`), `limit` (límite real detectado) y `replaces` (qué herramienta sustituyó).
- `configSnippet`: bloque obligatorio `{ label, code }` con parámetros de trabajo, flags o configuración siempre visible dentro de `<pre><code>` y con un control para copiar.
- `projectIds` y `relatedPostSlug`: referencias opcionales a proyectos y entradas de Bitácora, mostradas al pie de la ficha. `combosWith` registra compatibilidad con otras herramientas.

La entrada `aprender-y-construir-con-agentes` es narrativa y no enlaza a Proyectos ni Gadgets. `agentes-locales-y-hardware-accesible` conserva referencias opcionales al proyecto `monitor-nodo-pcb` y a los gadgets `agy-cli` y `esp32-s3-devkit`.

Las redes sociales y los medios de contacto actuales se mantienen en `data/social.ts`.
