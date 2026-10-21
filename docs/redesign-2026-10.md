# Muestra visual del rediseño (2026-10)

## Entrada y salida de señal por patas de los IC (UI-020)

- Cada módulo recibe y emite una señal por patas superiores reales medidas del encapsulado: `data-pcb-terminal` identifica la entrada y `data-pcb-output-terminal` la salida. Las rutas de entrada y salida comparten sus geometrías con bases, estelas y núcleos luminosos; el bus de salida viaja por el gap reservado sin cruzar caras ni texto.
- Coordinar ambas rutas en el ciclo existente de 4,8 s: la entrada recorre primero y llega al pin cerca del 40%; el marco y el banco de pines responden a esa llegada. La salida comienza después, cerca del 52%, y completa el ciclo sin reiniciar relojes al redimensionar. Hover, foco y presión realzan el módulo sin ocultar ni pausar pulsos; al salir, las señales conservan su fase. `prefers-reduced-motion` deja bases, pines y módulos quietos y visibles.
- Reforzar la lectura de las señales con núcleos blancos, estelas del tono rojo/cian y un fondo PCB repetido de mayor contraste, manteniendo la escala del patrón y la paleta negra, roja, blanca y cian.
- QA visual: 88/88 casos en cinco rutas y ocho anchos (320–1440 px) en Chromium y WebKit; pasó alineación entrada/salida con patas, geometría sin cruces por caras ni overflow, navegación y movimiento reducido. Las cuatro pruebas dirigidas de fase/paint en Inicio a 430 y 1440 px, ambos motores, confirmaron llegada de entrada al 40%, salida del 52–90%, núcleo blanco RGB (247, 251, 255), flujo durante hover/foco/presión y relojes estables al resize.
- `npm run check` aprobado en copia aislada: lint, 25 pruebas, TypeScript y export estático. Auditoría: cero hallazgos en producción y ocho previos en desarrollo (seis altos, dos moderados); dependencias intactas. Sin prueba en iPhone físico, medición de FPS ni despliegue. Mich-review aprobó la revisión acotada de fuentes y resumen de QA sin hallazgos; no modificó código.

## PCB conectada a patas reales (UI-019)

- Recuperar la paleta original rojo, negro, blanco/gris y cian; retirar el verde/menta y cobre/dorado de UI-018. Mantener la placa global oscura y discreta, con pistas locales de PCB y pasivos físicos R/C/L en los espacios libres.
- Sustituir las rutas ambientales desalineables por `PcbCircuit`, un componente cliente que mide módulos y terminales superiores reales con `ResizeObserver`, resize y carga de fuentes. `data-pcb-terminal` marca la pata metálica seleccionada; `data-pcb-route-index` conserva el orden de fase y `data-pcb-route-for` identifica el módulo destino. Cada trazo base, estela y núcleo comparten el mismo `d`, que termina en la punta externa del pin.
- Las pistas ortogonales y biseladas y sus pasivos físicos ocupan gaps reservados, sin entrar en títulos, texto ni caras de chips. Los pulsos arrancan junto con la llegada de marcos y pines cuando la medición inicial está lista; comparten duración de 4,8 s y delays escalonados. Resize actualiza geometría sin reiniciar las fases. Hover, foco y presión priorizan el chip local; `prefers-reduced-motion` conserva placa, chips y pistas estáticas, ocultando pulsos y brillos transitorios. Sin JavaScript quedan disponibles contenido y enlaces.
- Ajuste UI-019-R1: el `viewBox` usa el ancho y alto fraccionales del contenedor que ocupa el SVG, manteniendo la escala de las coordenadas medidas de los pines. El pulso conserva su offset de llegada mientras se desvanece y solo reinicia el trazo cuando ya está invisible.
- Ajuste UI-019-R2: el bus se acerca al pin (`busY = endY - 28`) para acomodar los pasivos y sus etiquetas en el gap reservado, fuera de las caras de chips vecinos; pitch, terminales, recorrido horizontal y fase permanecen iguales.
- Ajuste UI-019-R3: el patrón global repite su mosaico de 320 unidades dentro de un `viewBox` de 1000 × 1000 para evitar su ampliación como un único tile; se ajusta su opacidad compuesta para mantener la microtrama visible y subordinada a pistas y pines locales.
- Validación R2: Chromium y WebKit aprobaron 88/88 casos (cinco rutas en ocho anchos entre 320 y 1440 px, más navegación, menú móvil y contenido sin JavaScript). Las pistas terminan en patas reales con una diferencia máxima de 0,00665 px; pasivos, etiquetas y conexiones no invaden otros chips. Se conservaron contenido, enlaces y la estructura visible con movimiento reducido.
- Cuatro pruebas dirigidas aprobaron movimiento visible del pulso, trazado compartido, llegada al pin y encendido del chip en la misma fase, ausencia de wrapping, interacción y conservación del reloj al redimensionar. `npm run check` pasó en copia aislada: lint, 25 pruebas, TypeScript y export estático.
- Validación R3: build aprobado y 8/8 casos adicionales de fondo en Inicio/About, móvil/escritorio y ambos motores: patrón repetido, pads de hasta 8,64 px de radio, paleta restaurada, footer opaco y contactos alineados. No se midió FPS ni se probó en un iPhone físico; no se publicó. Auditoría: ocho hallazgos previos de desarrollo y cero de producción, sin cambios de dependencias.
- Mich-review aprobó R2 y R3 sin hallazgos pendientes tras revisar las fuentes y los artefactos de QA. No modificó código; quedan cerrados los hallazgos de alineación, wrapping y solapamiento de pasivos.

## Placa electrónica integrada (UI-018)

- Evolucionar el lenguaje UI-017 hacia una PCB física más reconocible en las cinco rutas: máscara de soldadura verde petróleo, pistas de cobre/dorado visibles, carriles paralelos, esquinas ortogonales y a 45°, pads y vías metálicas perforadas, además de serigrafía decorativa tenue.
- Retirar la red geométrica nacida del título y sus mediciones de puertos. Conservar los módulos, contenido, jerarquía, navegación, grupos Home de tres destinos por fila en escritorio y una columna por grupo en móvil, junto con los selectores `data-connection-target`, `data-connection-row` necesarios para el diagnóstico de viewport.
- Añadir componentes R/C/L decorativos en márgenes y espacios libres sin superponer texto: resistencias con bandas, capacitores cilíndricos con tapa y polaridad, e inductores con núcleo y bobinado de cobre. Dos recorridos luminosos atraviesan los gaps centrales con giros a 45° y siguen exactamente sus pistas de cobre; ciclos de 6,2 y 7,6 segundos. La secuencia ambiental de los encapsulados permanece subordinada.
- Preservar chips negros opacos, pin 1 y cuatro bancos de pines metálicos, estados de hover/foco/presión, accesibilidad y export estático. `prefers-reduced-motion` detiene las señales y mantiene la placa visible y quieta; sin JavaScript permanecen disponibles contenido y enlaces.
- Ajuste UI-018-R1: con movimiento reducido, marcos y bancos de pines conservan opacidad estática; hover, foco y presión pausan la fase local y mantienen el brillo del módulo interactuado sin iluminar vecinos.
- Ajuste UI-018-R2: el footer usa una superficie opaca verde petróleo oscuro para mantener el contraste del texto sobre las pistas del fondo.
- Validación UI-018-R1: 88/88 comprobaciones en Chromium y WebKit (80 de geometría en las cinco rutas y ocho anchos entre 320 y 1440 px, cuatro de interacción y cuatro sin JavaScript), más 4/4 pruebas dirigidas de señales sobre pistas e interacción con fase controlada. Se verificaron contenido y enlaces conservados, ausencia de overflow, pines y marcos visibles con movimiento reducido, navegación, historial y menú móvil. `npm run check` aprobó lint, 25 pruebas, TypeScript y export estático en copia aislada.
- Validación UI-018-R2: build estático aprobado y 20/20 comprobaciones específicas del footer en cinco rutas, dos anchos y ambos motores. La copia de control coincide con las fuentes de ejecución; `git diff --check` aprobado. Auditoría: ocho hallazgos previos en desarrollo (seis altos y dos moderados), cero en producción; dependencias intactas. No se probó en un iPhone físico ni se publicó.
- Revisión de mich-review: aprobado sin hallazgos pendientes tras inspeccionar las fuentes finales y los artefactos de QA de R1/R2; el revisor no modificó código.

## Encapsulados y fondo de placa (UI-017)

- Evolucionar los módulos conectados de las cinco rutas hacia encapsulados de circuito integrado: cuerpo negro mate y opaco, marcos biselados discretos, sombra corta, pines metálicos en sus cuatro lados y marca de orientación pin 1. Sustituir los motivos circulares actuales por detalles de chip/pistas; los puertos medidos existentes se integran visualmente con los pines sin cambiar la API `tone` ni los atributos `data-connection-*`.
- Sustituir la cuadrícula de fondo por una placa oscura global con recorridos PCB secundarios, pads y vías SVG/CSS. El motivo se monta una vez en el layout, detrás de todo contenido y fuera de las transiciones por ruta. Dos recorridos ambientales se animan con ciclos de 12 y 16 segundos; permanecen subordinados a las señales funcionales.
- Conservar composición, contenido, jerarquía, navegación, señales existentes y tiempos: secuencia Home de 5,4 s y rutas secundarias de 6,8 s. La llegada activa el contacto, los pines y el contorno del módulo. `prefers-reduced-motion` mantiene todo trazo y estado visible, pero quieto; no se añade movimiento con JavaScript.
- En móvil, compactar pines dentro de espacio decorativo reservado sin alterar las medidas de módulos ni crear overflow. Mantener SVG decorativo oculto a tecnologías de asistencia y sin interacción.
- Ajuste UI-017-R1: agrupar las patas metálicas en cuatro bancos repetidos por encapsulado para una silueta IC más reconocible; alinear contactos rectangulares a los puertos existentes y aplicar fase de llegada al grupo completo. El patrón pasivo de placa se repite en mosaicos responsivos de pistas biseladas, pads y vías, manteniendo exactamente dos señales ambientales animadas (12 y 16 s). Los tonos rojo/cian se propagan también a ramas y contactos.
- Validación final: Chromium y WebKit aprobaron 88/88 casos: 80 de geometría en cinco rutas y ocho anchos (320–1440 px), cuatro de interacción y cuatro sin JavaScript; sin overflow ni recortes, y con puertos alineados. Cuatro pruebas dirigidas confirmaron que hover, foco y presión suprimen el brillo de módulos vecinos, junto con siete grupos de pines animados en Inicio, cero pines individuales y colores correctos. `npm run check` y `git diff --check` aprobaron en copia aislada; auditoría previa: 8 hallazgos de desarrollo (6 high, 2 moderate), 0 de producción, sin cambios de dependencias. No se midió FPS ni se probó en un iPhone físico; no se publicó.

## HMR para loopback local (LOCAL-010)

- Next.js 16.3.8 protege sus recursos de desarrollo, incluido `/_next/hmr`, frente a orígenes cruzados. La configuración local admite `localhost` por defecto; `127.0.0.1` es otro origen y debe permitirse explícitamente para habilitar esos recursos y HMR.
- Configurar únicamente `127.0.0.1` en `allowedDevOrigins`, opción de desarrollo de Next.js. Desactivar la escritura automática de reglas de agente (`agentRules: false`) para preservar el `AGENTS.md` del proyecto. No ampliar el allowlist ni alterar el comportamiento de exportación; el cambio no afecta el sitio publicado.
- Validación LOCAL-010: inicialmente `localhost` aceptaba HMR y `127.0.0.1` era rechazado por Next. Tras permitir el origen exacto, la QA de Chromium y WebKit pasó 8/8 comprobaciones en escritorio y móvil para ambos hosts: Inicio presentó seis conexiones `.connection-base` alineadas a menos de 1 px, navegación a Blog y regreso, sin errores de JavaScript o HMR. El SVG completo contiene 50 trazos, incluidos detalles decorativos. El servidor permanece activo en `:3000`; no se deduce soporte IPv6, pues no escucha en `::1`. `npm run check` se validó en una copia aislada; `AGENTS.md` coincide con su baseline y no forma parte del cambio.

## Cabecera de navegación PCB (UI-007)

- Integrar logo, navegación de escritorio y menú móvil con el sistema de módulos y señales UI-006: superficies oscuras, marcos dobles biselados, terminales y pistas discretas con acentos rojo/cian.
- El logo MD/Mich DMark conserva su destino, nombre accesible y rol de acceso a Inicio. La navegación mantiene Blog, Proyectos, Gadgets y About me como enlaces internos reales, con indicador de ruta activa y señal breve de interacción.
- Mantener la barra compacta y sticky. En escritorio los enlaces se conectan mediante un rail superior que no cruza sus textos; el Drawer móvil conserva overlay, Escape, foco atrapado, devolución de foco y cierre al navegar.
- Usar el breakpoint `md` de Mantine y cerrar el Drawer al pasar a escritorio para liberar foco y scroll. Sin JavaScript permanecen disponibles el logo y la navegación de escritorio; `prefers-reduced-motion` deja estáticos los detalles nuevos.

### Ajustes UI-007-R1

- Los enlaces del Drawer usan ahora un terminal decorativo real con `aria-hidden`, independiente del pseudo-elemento que Mantine reserva para el overlay del botón. El rail y el terminal comparten una columna CSS, dejando el texto a su derecha.
- Se fijó explícitamente el fondo oscuro de la cabecera «Menú» y se centró el rail de escritorio con los contactos existentes a partir de la geometría medida, sin mover los enlaces ni recortar el foco.
- `git diff --check` y `npm run check` aprobados: lint, 25 pruebas, TypeScript y export estático.

### Validación UI-007

- mich-lead completó 45/45 comprobaciones funcionales en cinco rutas y anchos de 320 a 1440 px: sticky, teclado, navegación cliente e historial, pestaña nueva, Drawer con ARIA/foco/Escape/overlay/cierre/navegación, resize abierto, movimiento reducido y enlaces de escritorio sin JavaScript. Resultado: 0 fallos y 0 errores JavaScript.
- Pasaron 8/8 comprobaciones visuales del rail de escritorio a 992/1024/1440 px y terminales móviles a 320/390/768/991 px, incluidos foco y hover. Otras 5/5 comprobaciones cubrieron hover, foco y presión en enlaces de escritorio sin iluminar vecinos ni mover texto, y movimiento reducido.
- Las cinco rutas conservaron exactamente contenido, enlaces principales y metadata frente al baseline. UI-006 y Footer permanecieron intactos. mich-review aprobó UI-007-R1 sin blockers.

## Sistema de módulos y señales PCB (UI-006)

- Aplicar a las cinco rutas el lenguaje de placa oscura: módulos con marcos biselados y contorno doble, terminales visibles, pistas internas discretas y canales PCB con giros de 45°. La ornamentación permanece periférica y no tapa títulos, texto ni controles.
- Inicio mantiene seis módulos reales y el recorrido serial Mich DMark → Blog → Proyectos → Gadgets → About → Redes → Contacto. La señal tiene núcleo blanco/cian, estela corta y halo; cada llegada enciende marco, contactos y pista interior del módulo correspondiente. Blog conserva su tratamiento rojo y mayor jerarquía; Proyectos/Gadgets son principales y el resto secundarios.
- Blog, Proyectos y Gadgets aplican el mismo marco y señales a sus encabezados y contenedores reales, sin cambiar el estado vacío ni la preparación para colecciones futuras. About aplica el lenguaje a su presentación y grupos reales de redes/contacto.
- Mantener la cadencia de Inicio en 0,9 s por módulo y 5,4 s por vuelta, con fase compartida entre pista, señal y llegada. Hover, foco y presión priorizan el módulo/tramo local sin reiniciar la secuencia.
- Con `prefers-reduced-motion`, detener señales, marcos luminosos, pistas interiores, halos y barridos, manteniendo el trazado base, módulos y foco visibles. El contenido y los enlaces permanecen utilizables sin JavaScript.
- UI-006 sustituye la presentación rectangular de UI-003/UI-004 por un tratamiento PCB compartido en las cinco rutas; no modifica textos editoriales, navegación, metadata, URLs ni datos.

### Validación UI-006

- R2 pasó 40/40 comprobaciones de navegador en Chromium 153: las cinco páginas a 320, 390, 768, 810, 1024 y 1440 px; movimiento reducido en las cinco rutas; resize de Inicio; navegación cliente, teclado e historial; menú táctil y SSR sin JavaScript. Resultado: 0 fallos y 0 errores JavaScript.
- Pasaron 4/4 comprobaciones de secuencia Home, fase después de hover y movimiento reducido a 390/1440 px. Las llegadas default pasaron 10/10 verificaciones en About (dos contactos), Blog, Proyectos y Gadgets a 390/1440 px: núcleo, estela y halo llegan al 84%, se apagan entre 90–99% y no reaparecen por wrapping.
- Se mantienen aplicables las comprobaciones R1: pintura de pistas interiores 6/6, encendido de marcos 10/10 e interacción 2/2. Contenido, enlaces y metadata de las cinco rutas coinciden exactamente con el baseline; otros archivos fuera de los 10 permitidos permanecen intactos.
- `npm run check` aprobado: lint, 25 pruebas, TypeScript y export estático. `git diff --check` aprobado. mich-review aprobó UI-006-R2 sin blockers.

## Red editorial conectada en las cinco páginas (UI-003)

- Inicio sustituye el cuadro separado de áreas de interés por una composición editorial donde las conexiones llegan a los bloques reales. «Mich DMark» conecta con About me, Redes y Contacto; Blog permanece como acceso destacado y Proyectos/Gadgets siguen accesibles.
- About conecta su presentación con Redes y Contacto. Blog, Proyectos y Gadgets conectan sus encabezados con el bloque real de contenido o estado vacío; cuando haya una colección, se conectará su contenedor real sin agregar nodos por tarjeta.
- Las líneas decorativas se dibujan entre puertos de los bloques, sin cruzar texto ni controles. En escritorio conectan origen y destinos en una disposición amplia; en móvil los bloques fluyen en una columna con ramas visibles. Los enlaces y grupos conservan su estructura real, datos y destinos actuales.
- La señal recorre líneas base tenues y continuas. Hover, foco y presión resaltan el destino y su conexión; el texto permanece quieto. Las conexiones son `aria-hidden`, no interceptan eventos y desaparecen como animación bajo `prefers-reduced-motion`, dejando líneas estáticas.
- El alcance vigente abarca Inicio, About, Blog, Proyectos y Gadgets con un componente común. Las cinco rutas reciben el mismo lenguaje visual, adaptado a sus bloques editoriales reales.

## Inicio: seis destinos conectados (UI-004)

- En Inicio, los destinos conectados se amplían a seis cuadros con este orden editorial: Blog, Proyectos y Gadgets como grupo principal; About me, Redes y Contacto como grupo secundario. Blog recibe el mayor peso visual, seguido por Proyectos y Gadgets; todos son destinos reales y clicables.
- Las seis conexiones parten del título «Mich DMark». En escritorio la composición usa tres columnas y dos filas, con canal lateral y recorrido por fila para que las ramas no atraviesen otros cuadros. En móvil, los destinos forman una columna en el mismo orden, con ramas desde el gutter hasta el borde de cada cuadro.
- Una señal luminosa recorre los seis destinos en secuencia (Blog → Proyectos → Gadgets → About me → Redes → Contacto), con intervalos de 0,9 s y ciclo completo de 5,4 s; un pulso discreto acompaña cada llegada. Hover, foco y presión conservan prioridad local sin reiniciar la secuencia; `prefers-reduced-motion` deja líneas, cuadros y estados de interacción quietos. Enlaces y contenido siguen disponibles sin JavaScript.
- El cambio se limita a Inicio, su componente de conexiones optativo y esta documentación. Las otras cuatro rutas conservan su geometría, animación y contenido actuales.

### Verificación UI-004

- La matriz de mich-lead completó 12 comprobaciones de composición, navegación, resize, movimiento reducido y SSR. Otras 8 comparaciones confirmaron que las cuatro rutas restantes conservan textos, metadata, geometría y duración de animación.
- UI-004-R1 pasó 4 comprobaciones de movimiento: secuencia en orden, intervalos de 0,9 s y ciclo de 5,4 s, sincronización señal/halo antes y después de interactuar, y composición quieta con movimiento reducido a 390 y 1440 px.
- Pasaron 2 comprobaciones dirigidas en Home a 390 y 1440 px: las seis ramas respondieron a hover, foco y presión sin señales congeladas en otras conexiones y con puertos alineados. Resultado conjunto: 0 fallos y 0 errores JavaScript.
- `npm run check` aprobado: lint, 25 pruebas, TypeScript y build estático; `git diff --check` aprobado. mich-review es responsable de la revisión técnica.

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
