---
title: "Agentes locales y hardware accesible: por qué unir la terminal con la mesa de pruebas"
description: "Cómo estructurar prototipos donde un microcontrolador captura señales reales y un agente en terminal ayuda a diagnosticarlas sin depender de servicios complejos."
date: "2026-10-23"
tags: ["Agentes", "Hardware", "Software", "Bitácora"]
relatedProjects: ["monitor-nodo-pcb"]
relatedGadgets: ["agy-cli", "esp32-s3-devkit"]
---

Cuando empecé a unir electrónica y software, me encontré entre dos extremos: construir un sistema enorme en la nube solo para leer un sensor o mirar miles de líneas crudas en un monitor serie e intentar adivinar en qué milisegundo cayó el voltaje.

Quiero compartir una forma más sencilla de trabajar: mantener las piezas cerca, hacer que los datos se puedan leer y dejar que cada parte haga lo que mejor sabe hacer.

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

Con el tiempo entendí que un agente es más útil cuando no le pido que adivine lo que una regla simple puede medir:

1. **La placa y el colector local** miden con precisión: tiempos, umbrales, errores de checksum y reintentos en el bus I2C.
2. **El agente** ayuda cuando necesito relacionar síntomas, resumir qué cambió entre una prueba y otra o preparar una lista de cosas que revisar.

## 3. Hacia dónde va este espacio

Por eso este sitio tiene tres espacios con propósitos distintos:

- En **Bitácora** (`/blog/`) encontrarás el contexto, las ideas y el porqué de cada decisión.
- En **Proyectos** (`/projects/`) puedes abrir el banco de pruebas e inspeccionar la arquitectura, la traza real y la evolución de cada sistema.
- En **Gadgets** (`/setup/`) están las fichas técnicas y las configuraciones reales de las herramientas que participan en cada flujo.
