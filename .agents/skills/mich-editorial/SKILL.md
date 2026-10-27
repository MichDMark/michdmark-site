---
name: mich-editorial
description: >-
  Guía editorial y técnica para redactar, estructurar y validar entradas de Blog, Projects y Gadgets
  con la voz personal de Mich DMark (breve, directa y sin clichés de IA). Úsala siempre que el usuario
  pida crear, convertir un borrador o editar un post del blog, un proyecto o un gadget.
---

# Mich editorial

## Cuándo usarla

Úsala para crear o editar contenido de Blog, Projects o Gadgets. Consulta [esquemas y plantillas](./references/schemas-and-templates.md) antes de escribir datos o restaurar la ruta de artículos. Respeta el alcance autorizado por el usuario.

## Regla 1 — Materia prima real

No inventes experiencias, resultados, métricas, límites ni comandos. Si solo hay un tema general o faltan datos concretos, haz hasta tres preguntas breves antes de redactar: qué probó o pasó; qué falló o qué límite encontró; y qué comando, métrica o conclusión obtuvo. Omite preguntas ya respondidas.

## Regla 2 — Voz de Mich DMark y brevedad

Escribe en primera persona (yo), con tono conversacional técnico y honestidad sobre fallos y límites. En Blog, usa entre 200 y 450 palabras, párrafos de 2 a 4 oraciones y una primera frase directa, sin introducciones ceremoniales. En Projects y Gadgets, usa frases de 1 a 2 líneas por campo, datos concretos y comandos reales.

## Regla 3 — Lista negra anti-IA

No uses «En el mundo actual», «En la era de», «revolucionario», «sin lugar a dudas», «es importante destacar», «cabe mencionar», «sumergirnos en», «en conclusión», «en resumen» ni estructuras «no es solo X, sino Y». No abuses de rayas (—) ni de listas cuyas viñetas empiecen con «**Sustantivo:** explicación genérica».

## Modos de entrada

- **Modo A: conversacional en CLI.** El usuario cuenta en el chat lo que trabajó. Si falta un dato clave, haz hasta tres preguntas breves; presenta un borrador con la voz de Mich DMark para confirmar y, una vez aprobado, escribe el archivo final.
- **Modo B: borrador en drafts/.** Si el usuario menciona un archivo en `drafts/` o pide revisar la carpeta, inspecciona los archivos pertinentes, ignorando `drafts/README.md`. Usa las notas en bruto como materia prima, pregunta solo lo que falte, presenta la propuesta estructurada y escribe el archivo final dentro del alcance autorizado. Conserva el borrador salvo que el usuario pida borrarlo.

## Flujo

1. Recibe las notas mediante el modo elegido y pregunta solo por los datos concretos que falten.
2. Presenta una propuesta breve basada en lo aportado; en el modo A espera su aprobación antes de escribir.
3. Escribe el archivo correspondiente en `content/posts/`, `data/projects.ts` o `data/gadgets.ts` según el alcance autorizado.
4. Si existe al menos un post en `content/posts/` y falta `app/blog/[slug]/page.tsx`, restaura la ruta con la plantilla de la referencia, siempre que el alcance permita modificarla.
5. Valida las referencias cruzadas opcionales y ejecuta `npm run check`.
