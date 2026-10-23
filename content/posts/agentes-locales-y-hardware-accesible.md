---
title: "Agentes locales y hardware accesible: por qué unir la terminal con la mesa de pruebas"
description: "Cómo estructurar prototipos donde un microcontrolador captura señales reales y un agente en terminal ayuda a diagnosticarlas sin depender de servicios complejos."
date: "2026-10-23"
tags: ["Agentes", "Hardware", "Software", "Bitácora"]
kind: "experimento"
signals:
  - "Un protocolo de texto simple (JSONL por USB-CDC) convierte cualquier microcontrolador en una fuente legible para herramientas y agentes locales."
  - "Separar la captura determinista del análisis asistido evita falsos positivos y mantiene el proyecto 100% reproducible."
  - "Documentar los fallos de versión (v0.1 a v1.0) enseña más sobre un diseño real que mostrar solo el resultado final."
relatedProjects: ["monitor-nodo-pcb"]
relatedGadgets: ["agy-cli", "esp32-s3-devkit"]
---

Cuando empezamos un proyecto que mezcla electrónica y software, es fácil caer en dos extremos: o construimos un sistema enorme en la nube solo para leer un sensor, o nos quedamos mirando miles de líneas crudas en un monitor serie tratando de adivinar en qué milisegundo cayó el voltaje.

En esta primera entrada de la **Bitácora** quiero compartir el enfoque que estoy usando para mantener mis experimentos simples, accesibles y fáciles de depurar.

## 1. Hablar un idioma que tanto tú como tus herramientas entiendan

En lugar de imprimir frases sueltas por el puerto serie, una placa como el **ESP32-S3** puede emitir cada muestra en una línea JSON compacta (`JSONL`) con tres datos esenciales:

```json
{"t": 1104, "vbus": 2.78, "currentMa": 185.0, "crc": "OK"}
```

Esa decisión tan pequeña cambia todo el flujo de trabajo:

- Puedes leer las muestras a simple vista en la terminal.
- Puedes guardar 30 segundos de captura en un archivo de texto plano dentro del repositorio.
- Un script local o un **agente en terminal** puede inspeccionar la ventana de datos, cruzar el pico de corriente con la caída de tensión y sugerir qué parte física revisar primero.

## 2. Lo que hace el circuito vs. lo que analiza el agente

El secreto para que los agentes sean útiles en hardware y software accesible es **no pedirles que adivinen lo que una regla simple puede medir**:

1. **La placa y el colector local** miden con precisión: tiempos, umbrales, errores de checksum y reintentos en el bus I2C.
2. **El agente** entra cuando hay que correlacionar síntomas, resumir qué cambió entre una prueba y otra o proponer una lista de verificación con el multímetro.

## 3. Hacia dónde va este espacio

Por eso separé este sitio en tres áreas con formatos distintos:

- En **Bitácora** (`/blog/`) encontrarás el contexto, las ideas y el porqué de cada decisión.
- En **Proyectos** (`/projects/`) puedes abrir el banco de pruebas, inspeccionar los bloques de cada sistema y correr simulaciones de señal.
- En **Gadgets** (`/setup/`) están las fichas técnicas y las configuraciones reales de las herramientas que participan en cada flujo.
