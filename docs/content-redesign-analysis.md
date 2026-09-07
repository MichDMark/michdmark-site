# Análisis de contenido y propuesta de rediseño

El problema principal no es que falten páginas: el sitio todavía funciona como un directorio de enlaces con algunas tarjetas, no como una carta de presentación que conecte el perfil profesional, la faceta maker y la voz personal de Mich.

No hace falta cambiar el stack ni incorporar backend. El rediseño puede seguir siendo completamente estático y vivir en Markdown y TypeScript.

## Diagnóstico actual

### Lo que conviene conservar

- La combinación oscura con acento rojo ya ofrece una base reconocible.
- Mantine y los componentes existentes permiten evolucionar la interfaz sin reconstruir todo.
- Los artículos tienen una voz personal interesante: hablan de experiencia, aprendizaje, IA, desarrollo y presión profesional.
- La estructura estática es adecuada para GitHub Pages y prácticamente no tiene costos de mantenimiento.
- La separación entre contenido y presentación ya comenzó correctamente.

### Lo que no está comunicando bien

La portada dice “Desarrollador. Creador de Contenido. Maker.”, pero no demuestra ninguna de esas tres facetas. Después del título aparecen redes sociales y enlaces, sin proyectos, publicaciones recientes, procesos o evidencia del trabajo. Esto puede verse en `app/page.tsx`.

Otros problemas concretos:

- “Sobre mí” es demasiado corto y utiliza un avatar genérico. No explica la experiencia, especialidades, forma de trabajar ni objetivos actuales: `app/about/page.tsx`.
- “Proyectos” tiene un solo elemento y solamente muestra stack, descripción y enlace. Parece un directorio, no un caso de estudio: `data/projects.ts`.
- “Mis Gadgets” suena a consumo tecnológico, aunque el contenido pretende hablar de herramientas de trabajo: `app/setup/page.tsx`.
- El blog se presenta como contenido sobre “desarrollo web, diseño y tecnología”, pero los artículos actuales son más personales: carrera, aprendizaje, IA y oficio del desarrollo. La promesa editorial no coincide del todo con el contenido: `app/blog/page.tsx`.
- Todas las secciones usan prácticamente el mismo patrón visual: encabezado, descripción y cuadrícula de tarjetas. Esto reduce la personalidad y la jerarquía.
- `SectionHeader` genera un `h2` incluso cuando representa el título principal de la página; debería poder producir un `h1`: `components/SectionHeader.tsx`.
- El tema declara Inter y Space Grotesk, pero no existe una carga explícita de esas fuentes. Es probable que muchos visitantes estén viendo las fuentes de sistema: `lib/theme.ts`.

## Posicionamiento sugerido

El sitio necesita una idea central que una todas las secciones. Una posible dirección sería:

> Soy desarrollador y maker. Construyo productos, experimento con tecnología y documento el proceso, las decisiones y lo que aprendí.

No tiene que ser el texto definitivo, pero sí representa mejor lo que se quiere proyectar. Desde ahí, cada sección cumple una función:

| Sección | Qué demuestra |
| --- | --- |
| Inicio | Quién eres, qué haces y por qué vale la pena explorar tu trabajo |
| Blog | Cómo piensas |
| Proyectos | Cómo resuelves y construyes |
| Herramientas | Cómo trabajas |
| Sobre mí | De dónde vienes y hacia dónde vas |

Conviene evitar crear demasiadas secciones independientes inicialmente. “Experimentos”, “maker”, “software” y “contenido” pueden comenzar como categorías de proyectos. “Ahora” podría ser un bloque en la portada y convertirse en página cuando exista suficiente contenido.

## Arquitectura propuesta

La navegación principal podría quedar así:

- Inicio
- Blog
- Proyectos
- Herramientas
- Sobre mí

### Inicio

La portada debería ser un resumen editorial del sitio, no una página de enlaces:

1. Presentación clara: nombre, especialidad y enfoque.
2. Breve declaración personal.
3. Proyecto destacado con imagen, contexto y resultado.
4. Últimas publicaciones.
5. Bloque “En qué estoy trabajando ahora”.
6. Vista breve del taller o las herramientas.
7. Contacto y redes al final.

Las redes no deberían ocupar el segundo bloque más importante de la página. Son un destino secundario, no la razón principal para conocer a Mich.

### Blog

Se mantendría una sola colección, pero con una estructura editorial más clara:

- Ideas y reflexiones.
- Desarrollo y oficio.
- IA y herramientas.
- Maker y experimentos.
- Aprendizajes personales.

Cada publicación podría añadir campos estáticos como:

```yaml
type: "ensayo"
featured: true
cover: "/images/blog/..."
series: "Construir con IA"
```

No hace falta implementar filtros complejos todavía. Con pocas entradas, una publicación destacada seguida de una lista cronológica ofrece más personalidad que una cuadrícula uniforme.

### Proyectos

Aquí está la oportunidad más importante. Cada proyecto debería tener una página propia en Markdown y contar una historia:

1. Qué problema o curiosidad inició el proyecto.
2. Contexto y restricciones.
3. Objetivo.
4. Proceso seguido.
5. Decisiones técnicas.
6. Errores o caminos descartados.
7. Resultado.
8. Qué se aprendió.
9. Qué se haría diferente.
10. Repositorio, demo o recursos.

También se podrían clasificar los proyectos:

- Profesional.
- Personal.
- Maker.
- Experimento.
- En progreso.
- Archivado.

Así, un proyecto no necesita estar terminado o ser comercial para resultar valioso. Documentar un prototipo fallido también demuestra criterio y aprendizaje.

### Herramientas

Se recomienda renombrar visualmente “Mis Gadgets” usando una de estas opciones:

- Herramientas
- Mi taller
- Herramientas y equipo
- Cómo trabajo

“Mi taller” tiene más personalidad maker; “Herramientas” es más claro profesionalmente.

La sección debería explicar la relación con cada herramienta, no solamente enumerarla:

- Para qué se utiliza.
- Por qué fue elegida.
- Qué problema resuelve.
- Sus limitaciones.
- En qué proyectos aparece.

Las categorías podrían ser:

- Desarrollo.
- Electrónica y fabricación.
- Creación de contenido.
- Escritorio.
- Software y servicios.
- Café y rituales de trabajo.

### Sobre mí

Debería ser la narración que conecta todo:

- Una fotografía real o una representación gráfica intencional.
- Presentación breve.
- Ingeniería electrónica y maestría en mecatrónica.
- Transición hacia desarrollo de software.
- Faceta maker y creación de contenido.
- Principios de trabajo.
- Intereses personales.
- Enfoque actual.
- Forma de contacto.

No debería convertirse en un currículum completo. La meta es que alguien entienda la trayectoria y recuerde algo específico sobre Mich.

## Dirección visual

Conviene conservar el modo oscuro y el rojo, pero mover la estética de “dashboard tecnológico” hacia una mezcla de publicación editorial y mesa de trabajo.

Recomendaciones:

- Reducir la cantidad de tarjetas de cristal.
- Alternar secciones abiertas, líneas editoriales, tarjetas y bloques con imágenes.
- Incorporar fotografías reales de proyectos, prototipos, escritorio, herramientas y proceso.
- Usar diagramas, bocetos o capturas cuando aporten contexto.
- Crear una escala tipográfica más marcada y cargar realmente las fuentes seleccionadas.
- Hacer que el rojo funcione como acento, no como relleno recurrente.
- Añadir estados activos y `hover` visibles en la navegación.
- Diferenciar visualmente artículos, proyectos y herramientas.
- Mantener una anchura estrecha para lectura y una más amplia para casos de estudio.
- Usar etiquetas con moderación; actualmente muchas tarjetas dependen demasiado de badges.
- Evitar que todo tenga exactamente el mismo borde, radio y fondo.

La identidad debería surgir principalmente del trabajo real y de la forma de escribir de Mich. Las imágenes generadas o decoraciones abstractas no deberían sustituir fotografías, capturas y procesos auténticos.

## Estandarización del contenido

Se puede seguir usando Markdown, pero separando las colecciones:

```text
content/
├── posts/
├── projects/
└── pages/
    └── about.md

data/
├── tools.ts
├── social.ts
└── site.ts

public/
└── images/
    ├── blog/
    ├── projects/
    ├── tools/
    └── profile/
```

Blog y proyectos pueden compartir infraestructura de lectura, pero no necesariamente el mismo modelo. Un artículo tiene autoría y reflexión; un proyecto necesita estado, rol, periodo, resultados y aprendizajes.

Todo esto sigue funcionando durante `next build`: no requiere base de datos, CMS, API ni funciones de servidor.

## Orden recomendado

1. Definir posicionamiento, audiencia y tono.
2. Inventariar el contenido existente y posibles proyectos para documentar.
3. Escribir la nueva portada y el nuevo “Sobre mí”.
4. Diseñar el formato estándar de casos de estudio.
5. Renombrar y reorganizar “Gadgets” como “Herramientas” o “Mi taller”.
6. Documentar la intención del rediseño en `docs/`.
7. Crear el nuevo sistema visual.
8. Migrar contenido y construir las páginas.
9. Revisar ortografía, metadata, accesibilidad y versión móvil.

La recomendación es comenzar por contenido y arquitectura, no por colores o componentes. La dirección visual correcta será mucho más evidente cuando se defina exactamente qué historia debe contar la portada y cuáles serán los primeros tres proyectos que funcionarán como prueba del trabajo realizado.
