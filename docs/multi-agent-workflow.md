# Flujo multiagente con Herdr

## Estado

El piloto tiene cuatro roles configurados. `orquestador`, `dev` y `revisor` viven en la pestaña `agentes`; `afinador` conserva el contexto y mantiene el plano de control desde una pestaña separada. El launcher `herdr-project` ya valida, inspecciona e inicia roles desde paneles preparados, y el flujo extremo a extremo de fase 4 quedó validado.

El archivo `.herdr/session.json` mantiene `implementationStatus: "workflow-validated"`: los adaptadores, el launcher, los handoffs y los permisos críticos pasaron pruebas reales e independientes. La creación del layout sigue siendo explícita porque `herdr agent start` ocupa paneles existentes y no crea ni divide paneles.

## Objetivo

Mantener una sesión Herdr con cuatro responsabilidades independientes:

| Rol | Harness previsto | Responsabilidad | Acceso esperado |
| --- | --- | --- | --- |
| `afinador` | Codex | Conservar contexto y mejorar el sistema de agentes | Configuración y documentación del flujo |
| `orquestador` | Codex | Delimitar, delegar e integrar | Coordinación |
| `dev` | OpenCode | Implementar y validar | Escritura de aplicación y producto |
| `revisor` | Agy | Auditar el resultado bajo demanda | Solo lectura |

Los modelos y harnesses son reemplazables. Los contratos describen responsabilidades estables; el preset decide qué herramienta desempeña cada rol.

## Archivos del piloto

- `.herdr/session.json`: manifiesto versionado de la sesión.
- `.herdr/prompts/orchestrator.md`: contrato neutral del orquestador.
- `.herdr/prompts/developer.md`: contrato neutral del desarrollador.
- `.herdr/prompts/reviewer.md`: contrato neutral del revisor.
- `.herdr/prompts/tuner.md`: contrato neutral del afinador.
- `.herdr/bin/herdr-project`: fuente versionada del launcher genérico.
- `.herdr/tests/herdr-project-smoke.sh`: pruebas aisladas del launcher con una CLI simulada.
- `.opencode/agents/project-dev.md`: adaptador local del desarrollador para OpenCode.
- `.agents/agents/project-reviewer/agent.md`: adaptador local de solo lectura para Agy.
- `~/.codex/personal-orchestrator.config.toml`: perfil global de Codex; no está versionado en este repositorio.
- `~/.codex/personal-tuner.config.toml`: perfil global reproducible del afinador; no está versionado en este repositorio.
- `AGENTS.md`: reglas generales del repositorio, compartidas por cualquier forma de trabajo.

Los contratos de `.herdr/prompts/` no se cargan automáticamente en una sesión individual. Solo deben aplicarse cuando un perfil o agente de Herdr los seleccione expresamente. Por eso el proyecto sigue siendo compatible con una sesión sencilla de Codex, OpenCode, Agy o con el flujo de otro desarrollador.

## Manifiesto

`session.json` usa rutas relativas a la raíz del proyecto y contiene:

- `schemaVersion`: versión de esta estructura local.
- `implementationStatus`: nivel real de implementación del piloto.
- `session.name`: sesión persistente usada por `attach` y `recover`.
- `defaultPreset`: combinación que se usará si no se elige otra.
- `launchOrder`: orden explícito de validación, reporte y arranque; debe ser una permutación exacta de las claves de `roles`.
- `coordination.singleApplicationWriterRole`: rol con autoridad para editar código, producto y configuración de la aplicación.
- `coordination.configurationCustodianRole`: rol que mantiene contratos, adaptadores, métricas y continuidad.
- `coordination.reviewPolicy`: momento en que interviene el revisor.
- `roles`: nombre semántico, etiqueta esperada del panel, harness, contrato, intención de acceso y argumentos objetivo.

El manifiesto no concede permisos. `accessIntent` documenta la intención; los controles efectivos deben configurarse y probarse con las capacidades reales de cada harness.

## Adaptadores validados

### Codex: `personal-tuner`

El perfil del `afinador` usa `gpt-5.6-sol` con razonamiento medio, escritura en el workspace y subagentes internos deshabilitados. Su contrato limita esa escritura al plano de control y la documentación multiagente durante esta etapa.

Arranque directo para una futura sesión:

```bash
codex --profile personal-tuner
```

La sesión que creó este rol fue renombrada en vivo como `afinador`; adoptará el perfil reproducible cuando necesite reiniciarse, no antes.

### Codex: `personal-orchestrator`

El perfil global usa `gpt-5.6-sol` con razonamiento medio, sandbox de solo lectura y subagentes internos deshabilitados. También deshabilita apps en este perfil para mantener el rol concentrado en la coordinación externa. Codex carga perfiles desde archivos hermanos de `~/.codex/config.toml`.

Arranque directo:

```bash
codex --profile personal-orchestrator
```

### OpenCode: `project-dev`

El agente local usa `openai/gpt-5.6-terra-fast` y es el único escritor. Puede editar y ejecutar validaciones dentro del proyecto; niega acceso externo, subagentes, `git commit`, `git push` y `sudo`. `rm -rf` requiere aprobación.

OpenCode 1.18.27 aplica actualmente la sintaxis estable `permission`, `bash` y `task`. La sintaxis documentada para V2 (`permissions`, `shell`, `subagent`) fue reconocida como metadato, pero no se convirtió en permisos efectivos en este binario; por eso este adaptador usa el formato que verificó `opencode debug agent project-dev`.

Arranque directo:

```bash
opencode --agent project-dev --model openai/gpt-5.6-terra-fast
```

### Agy: `project-reviewer`

El agente local declara únicamente `view_file` y `grep_search`, pero una prueba adversarial demostró que Agy 1.1.25 expone herramientas adicionales cuando este adaptador se usa como agente principal. La lista del frontmatter expresa intención y no constituye por sí sola una frontera de seguridad.

La protección efectiva se configuró en `/permissions` → `Project` → `denylist` con estas reglas:

```text
command(*)
write_file(*)
```

Después de aplicarlas, Agy negó `command(pwd)` y la creación de un archivo marcador sin mostrar una solicitud de aprobación. Estas reglas son estado local de Agy, no quedan versionadas en el repositorio y deben verificarse al replicar o restaurar la configuración. Además afectan a todas las sesiones Agy de este proyecto; si en el futuro Agy debe actuar como desarrollador, será necesario revisar la separación de ámbitos antes de cambiar la denylist.

El modelo de arranque es `gemini-3.8-flash-low`; el nivel de esfuerzo forma parte del identificador y no debe combinarse con `--effort`.

Arranque directo:

```bash
agy --agent project-reviewer --model gemini-3.8-flash-low --sandbox --mode=plan
```

## Flujo operativo

El `afinador` queda fuera del ciclo normal de entrega. Mantiene contexto, perfiles, permisos, métricas, recuperación y documentación. No recibe ni implementa features mientras los agentes están en etapa de afinación.

1. El usuario entrega el objetivo al `orquestador`.
2. El orquestador inspecciona el contexto y formula una tarea con alcance, restricciones, aceptación y validación.
3. Antes de enviar trabajo, consulta el estado del agente `dev`.
4. El `dev` implementa como único escritor y devuelve un reporte terminal `done` o `blocked`.
5. El orquestador revisa el diff y la evidencia.
6. Si aplica la política de revisión, entrega objetivo, cambios y validación al `revisor`.
7. El revisor responde `clean` o devuelve hallazgos priorizados.
8. El orquestador decide si solicita correcciones y finalmente informa al usuario.

La comunicación entre roles usa los bloques YAML definidos en sus contratos. Son sobres de interoperabilidad: cada harness puede producir texto distinto, pero debe conservar los campos relevantes.

## Autoridades de escritura

En el preset `balanced`, solo `dev` modifica código, producto, dependencias o configuración de la aplicación durante una tarea delegada. El `afinador` puede modificar contratos, adaptadores y documentación del sistema multiagente cuando no colisione con un archivo activo de `dev`.

- El orquestador no corrige archivos mientras el desarrollador trabaja.
- El revisor nunca modifica archivos.
- El afinador no implementa tareas de producto durante la etapa de afinación.
- Las tareas de producto para `dev` siempre pasan por `orquestador`.
- Si el desarrollador termina bloqueado, el orquestador informa el bloqueo antes de asumir otro modo de trabajo.
- Los cambios preexistentes del usuario se preservan y se excluyen del alcance salvo instrucción explícita.

## Revisión bajo demanda

La revisión se solicita cuando cambia comportamiento, configuración o despliegue; cuando el diff cruza varios módulos; cuando aparecen dependencias o validaciones incompletas; o cuando el usuario la pide.

Puede omitirse para documentación aislada y cambios mecánicos de riesgo bajo. El orquestador debe mencionarlo en el cierre para que la ausencia de revisión no sea ambigua.

## Estados y recuperación

Los contratos comparten cinco estados conceptuales:

- `idle`: disponible.
- `working`: ocupado; no enviar otra tarea.
- `done`: terminó con evidencia.
- `blocked`: necesita una decisión, permiso o dato.
- `unknown`: inspeccionar el panel antes de intervenir.

Los identificadores internos de panel de Herdr son efímeros. La operación normal debe usar nombres explícitos (`afinador`, `orquestador`, `dev`, `revisor`) y confirmar el estado antes de enviar instrucciones. No se debe cerrar ni reiniciar un panel para recuperarlo sin autorización del usuario.

## Registro manual en Herdr

Para una sesión completamente nueva, crear o elegir cuatro paneles de shell disponibles y registrar cada agente con su nombre semántico:

```bash
herdr agent start afinador --kind codex --pane <pane-id> -- --profile personal-tuner
herdr agent start orquestador --kind codex --pane <pane-id> -- --profile personal-orchestrator
herdr agent start dev --kind opencode --pane <pane-id> -- --agent project-dev --model openai/gpt-5.6-terra-fast
herdr agent start revisor --kind agy --pane <pane-id> -- --agent project-reviewer --model gemini-3.8-flash-low --sandbox --mode=plan
```

Antes de ejecutar cada comando, el panel objetivo debe estar en un prompt de shell sin procesos en primer plano. Los IDs de panel deben obtenerse de la respuesta actual de Herdr; no deben reutilizarse desde documentación o sesiones anteriores.

Si el `afinador` ejecuta el launcher desde su propia sesión, el launcher lo reconoce como rol vivo y omite su arranque. Nunca intenta iniciar un agente desde el panel que está ejecutando el comando.

## Launcher `herdr-project`

La fuente versionada vive en `.herdr/bin/herdr-project`. La copia instalada en `~/.local/bin/herdr-project` permite usar el mismo comando desde cualquier proyecto que implemente el manifiesto compatible. El launcher detecta la raíz Git actual y no contiene rutas específicas de `proyecto_mich`.

Debe ejecutarse desde la raíz del repositorio. Para operaciones sobre paneles exige `HERDR_ENV=1`:

```bash
herdr-project validate
herdr-project status
herdr-project start --dry-run
herdr-project start
```

- `validate` revisa JSON, esquema, preset, contratos, adaptadores, nombres, etiquetas, CWD, harness de agentes vivos y disponibilidad de shells para roles ausentes.
- `status` presenta los cuatro roles y devuelve error si encuentra ausencias o conflictos.
- `start --dry-run` construye los comandos completos sin ejecutarlos.
- `start` hace un preflight de todos los roles antes de cualquier cambio, omite agentes vivos e inicia únicamente los ausentes.

Los paneles vacíos deben etiquetarse antes del arranque:

```bash
herdr pane rename <pane-id> afinador
herdr pane rename <pane-id> orquestador
herdr pane rename <pane-id> dev
herdr pane rename <pane-id> revisor
```

Las etiquetas se resuelven en tiempo de ejecución y los IDs no se guardan. El panel debe estar en la raíz del proyecto, con su shell como único proceso en foreground. Un panel duplicado, ocupado, situado en otro CWD o igual al panel que ejecuta el launcher bloquea todo el arranque.

### Volver después de perder la terminal

`attach` y `recover` se ejecutan desde una terminal externa, también en la raíz del proyecto:

```bash
herdr-project attach
herdr-project recover
```

`attach` intenta adjuntarse a `session.name`. `recover` primero confirma que la sesión continúa viva y solo entonces se adjunta. Si la sesión se detuvo, devuelve un error y no crea una nueva, no reanuda conversaciones y no reemplaza agentes. Esto distingue una ventana de Ghostty perdida de una sesión Herdr realmente finalizada.

Para sincronizar una actualización de la fuente versionada:

```bash
cp .herdr/bin/herdr-project ~/.local/bin/herdr-project
chmod +x ~/.local/bin/herdr-project
```

### Pruebas del launcher

```bash
.herdr/tests/herdr-project-smoke.sh
```

El smoke test crea un repositorio temporal y una CLI Herdr simulada. No toca los paneles reales. Sus 17 casos cubren arranque, dry-run, panel ausente, etiquetas y agentes duplicados, harness incorrecto, estados conflictivos, ejecución externa y fallos defensivos de attach/recover.

## Validación de adaptadores

Se comprobó:

- Carga del perfil Codex y construcción del contexto local.
- Resolución del agente OpenCode y sus permisos efectivos.
- Parseo inequívoco del frontmatter Agy y, por separado, denylist Project efectiva para comandos y escritura.
- Smoke test real de cada adaptador con una respuesta exacta y sin herramientas.

Los smoke tests mostraron que crear conversaciones desechables tiene un costo de contexto considerable: aproximadamente 10.9k tokens para Codex, 4.3k para OpenCode y 15.2k para Agy, aunque cada respuesta fuera de una sola línea. La operación normal debe reutilizar sesiones persistentes de rol.

## Optimización futura de salidas con RTK

RTK podría evaluarse en el futuro como una optimización para reducir o filtrar ruido en las salidas de comandos, por ejemplo logs repetitivos, indicadores de progreso, warnings duplicados o salida verbosa de validaciones. No está adoptado ni habilitado en este flujo, y no se promete compatibilidad con los harnesses actuales.

Antes de considerarlo, requiere una auditoría de compatibilidad en macOS. Su eficacia deberá medirse contra una línea base observable —tokens o volumen de salida, latencia y preservación de errores y señales útiles— para confirmar que el filtrado no oculte información relevante.

## Fase 4 completada

Se creó la pestaña `agentes` con los roles persistentes `orquestador`, `dev` y `revisor`. En las pruebas iniciales se completaron dos handoffs: una revisión devolvió `clean` y otra se omitió correctamente por política `on-demand`; el `dev` tardó 35.5 s y aquella revisión aproximadamente 15.3 s.

La auditoría rigurosa posterior tardó 3 min 14 s y produjo tres hallazgos reales: un mensaje dependiente de cuatro roles, pérdida del orden intencional y cobertura negativa insuficiente. El `afinador` corrigió el plano de control, la suite pasó de 11 a 17 casos y la revisión final devolvió `clean`.

La primera prueba de permisos reveló que el contrato y el frontmatter no impedían técnicamente ejecutar comandos. Después de agregar la denylist Project, las pruebas reales de `pwd` y escritura fueron denegadas sin prompt y no se creó el marcador. No se instalaron dependencias, no se crearon commits ni se reiniciaron paneles.

## Fase 3 completada

El launcher mínimo implementa `validate`, `status`, `start`, `attach`, `recover` y `--dry-run`. Los cuatro paneles actuales conservan etiquetas semánticas, y una ejecución real de `start` confirmó que el comando es idempotente cuando los agentes ya están vivos.

La construcción de `herdr agent start` está centralizada y toma `kind` y argumentos directamente del preset. Ninguna ruta del proyecto está codificada en el launcher.

## Después de la fase 4

1. Entrar a la fase 5 creando un segundo preset con al menos dos cambios de harness o modelo.
2. Establecer una línea base de costo, latencia y volumen de salida antes de evaluar RTK.
3. Replicar la configuración en un segundo proyecto y registrar qué elementos son realmente portables.
4. Auditar e instalar RTK en macOS solo si preserva señales útiles.
5. Crear el documento final `START-HERE-replicar-sesion-herdr.md` con la evidencia de ambos proyectos.

## Validación de esta fase

Para cambios declarativos de este flujo, la validación local mínima es:

```bash
jq empty .herdr/session.json
.herdr/tests/herdr-project-smoke.sh
herdr-project validate
herdr-project status
opencode debug agent project-dev
git diff --check
```

La validación de Agy requiere cargar el agente mediante el CLI porque no expone un comando de depuración equivalente. No es necesario ejecutar lint, pruebas, TypeScript o build mientras no cambie código ni configuración de la aplicación.

## Referencias de formato

- [Configuración de Codex](https://developers.openai.com/codex/config-reference/)
- [Agentes de OpenCode](https://opencode.ai/docs/agents)
- [Agentes personalizados de Agy](https://www.antigravity.google/docs/subagents/)
- [Permisos de Agy](https://www.antigravity.google/docs/cli/permissions/)
- [Modos de ejecución de Agy](https://antigravity.google/docs/cli/modes/)
- [Sandbox de Agy](https://antigravity.google/docs/cli/sandbox/)
