# Alcance editorial

## Enfoque

El sitio de Mich DMark explora tecnología accesible e inteligencia artificial aplicada a software y hardware. El blog crecerá con explicaciones e ideas; proyectos y gadgets documentarán trabajo y herramientas cuando haya contenido listo. Las colecciones actuales están vacías y su contenido anterior se retiró sin conservar copias en el repositorio.

## Páginas

La navegación tiene cinco destinos públicos:

| Página | Ruta | Propósito |
| --- | --- | --- |
| Inicio | `/` | Presentar a Mich DMark y el enfoque general del sitio. |
| About me | `/about` | Explicar brevemente el enfoque personal y ofrecer redes y contacto. |
| Blog | `/blog` | Publicar ideas y explicaciones accesibles sobre tecnología e IA. |
| Proyectos | `/projects` | Documentar proyectos de software y hardware y cómo se construyen. |
| Gadgets | `/setup` | Compartir herramientas de software y hardware y su uso. |

Mientras cada colección esté vacía, su página explica su propósito y muestra el mensaje «Contenido en preparación» sin tarjetas vacías ni apariencia de error.

La exportación estática de Next.js requiere al menos un parámetro para generar una ruta dinámica. Por ello, mientras el blog no tenga publicaciones, no se genera una ruta de detalle de artículos. Antes de agregar el primer archivo `.md` a `content/posts/`:

1. Añadir/restaurar `app/blog/[slug]/page.tsx` con `generateStaticParams()` basado en `getAllPosts()`, metadata por post y el renderizado con `getPostBySlug()` (incluyendo `notFound()` para slugs desconocidos). La función debe producir un parámetro por cada post; Next.js no acepta una lista vacía con `output: "export"`.
2. Confirmar que `PostCard` enlaza a `/blog/<slug>/` para coincidir con `trailingSlash: true`.
3. Agregar el primer post y ejecutar `npm run check` para validar la exportación estática.
4. Inspeccionar `out/blog/<slug>/index.html`, los enlaces desde el listado y `out/sitemap.xml` para comprobar que el artículo se exporta y se incluye en el sitemap.

## Referencias futuras entre contenidos

Cuando existan publicaciones, proyectos o gadgets que aporten contexto mutuo, se podrán añadir referencias explícitas y bidireccionales entre ellos. Por ejemplo, un post puede enlazar al proyecto o gadget que describe, y la página de ese proyecto o gadget puede enlazar de regreso al post. Las relaciones deberán usar identificadores estables (como el slug del post y un identificador del proyecto o gadget) y datos locales; no implementar todavía filtros, páginas de detalle ni un sistema de relaciones.

Las redes sociales y los medios de contacto actuales se mantienen en `data/social.ts`.
