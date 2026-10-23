# Alcance editorial y modelos de sección

## Enfoque

El sitio de Mich DMark explora tecnología accesible y el uso de agentes en software y hardware. Para evitar que todas las páginas parezcan el mismo listado de tarjetas con texto plano, cada sección principal tiene una **identidad informativa, estructura de datos y mecánica de interacción propias**, manteniendo el sitio 100% estático en Markdown y TypeScript local.

La terminología pública del sitio usa «agentes» para hablar de este tema; mantener esa elección en páginas, metadata y textos compartidos.

## Páginas e identidad por sección

La navegación tiene cinco destinos públicos:

| Página | Ruta | Identidad y propósito |
| --- | --- | --- |
| Inicio | `/` | Presentar a Mich DMark y conectar el mapa general del sitio sobre la placa PCB. |
| About me | `/about` | Explicar brevemente el enfoque personal y ofrecer redes y contacto. |
| Bitácora | `/blog` | Cuaderno de laboratorio e ingeniería: entradas cronológicas con filtro tipo *DIP switch* y síntesis desplegable de señales clave (*TL;DR*). |
| Proyectos | `/projects` | Banco de pruebas (*Workbench*): sistemas desarmables con inspector interactivo por capas (`Arquitectura`, `Simulador de señal` y `Evolución v0.1 → v1.0`). |
| Gadgets | `/setup` | Mesa de taller y *Datasheets*: fichas técnicas con métricas reales, recetas de configuración copiables y simulador de flujos de trabajo (*Signal Flow*). |

> Nota de ruta: La sección **Bitácora** conserva la ruta `/blog/` y `/blog/<slug>/` por simplicidad técnica y estabilidad de enlaces, cambiando su nombre visible en navegación, portada y encabezados.

Mientras una colección esté vacía, su página explica su propósito y muestra el mensaje «Contenido en preparación» sin tarjetas vacías ni apariencia de error.

## Modelos de información por sección

### 1. Bitácora (`content/posts/*.md` y `lib/posts.ts`)

Combina narrativa en Markdown con metadatos estructurados en el frontmatter:

- Campos obligatorios: `title`, `description`, `date` (`YYYY-MM-DD`).
- Campos opcionales:
  - `tags`: lista de etiquetas temáticas.
  - `kind`: `"experimento" | "ensayo" | "guia" | "nota-rapida"` para clasificar el formato de la entrada.
  - `signals`: lista de 2 a 4 puntos clave (*TL;DR*) que el visitante puede desplegar directamente en el bus de lectura sin abrir el artículo completo.
  - `relatedProjects` y `relatedGadgets`: identificadores estables (`id`) para enlazar con Proyectos y Gadgets.

La exportación estática de Next.js requiere al menos un parámetro para generar `app/blog/[slug]/page.tsx`. Si en el futuro se vacían todos los archivos `.md` de `content/posts/`, debe retirarse temporalmente `app/blog/[slug]/page.tsx` hasta volver a tener al menos una entrada publicada.

### 2. Proyectos (`data/projects.ts`)

Cada proyecto se modela como un **sistema desarmable** en lugar de un texto plano:

- Identificación y contexto: `id`, `name`, `tagline`, `description`, `domain` (`"software" | "hardware" | "hibrido" | "agentes"`), `status` (`"produccion" | "prototipo" | "experimento" | "archivado"`), `stack` y `url`.
- `metrics`: pares `{ label, value }` con mediciones o datos concretos del sistema.
- `blocks`: nodos del diagrama de arquitectura (`id`, `label`, `role`: `"input" | "core" | "output" | "storage"`, `tech`, `detail`) que el usuario puede inspeccionar en la pestaña **Arquitectura**.
- `simulation`: escenarios pregrabados (`id`, `inputLabel`, `trace`, `output`) para que el visitante ejecute y recorra paso a paso el comportamiento del proyecto en la pestaña **Simulador**.
- `milestones`: hitos de iteración (`version`, `title`, `outcome`, `status`: `"failed" | "iterated" | "shipped"`) mostrados en la pestaña **Evolución**.
- `gadgetIds` y `relatedPostSlug`: referencias cruzadas hacia `/setup/` y `/blog/`.

### 3. Gadgets (`data/gadgets.ts`)

Cada herramienta de software o hardware se presenta como un **Datasheet operativo** dentro de su categoría (`GadgetCategory`), acompañado de flujos de trabajo (`GadgetWorkflow`):

- Ficha técnica (`Gadget`): `id`, `name`, `description`, `role`, `status` (`"diario" | "por-proyecto" | "en-pruebas" | "reemplazado"`), `verdict` (`"imprescindible" | "recomendado" | "situacional"`), `specs` (`{ label, value }[]`), `pros` (`string[]`), `limit` (límite real detectado) y `replaces` (qué herramienta sustituyó).
- `configSnippet`: bloque opcional `{ label, code }` con parámetros de trabajo, flags o configuración lista para copiar al portapapeles.
- Flujos de señal (`gadgetWorkflows`): escenarios (`id`, `title`, `description`, `steps`, `gadgetIds`) que al seleccionarse iluminan en la mesa de taller únicamente los gadgets que trabajan juntos en ese pipeline.
- `projectIds` y `combosWith`: conexiones explícitas con proyectos y otras herramientas.

Las redes sociales y los medios de contacto actuales se mantienen en `data/social.ts`.
