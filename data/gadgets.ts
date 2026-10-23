export type GadgetStatus = "diario" | "por-proyecto" | "en-pruebas" | "reemplazado";
export type GadgetVerdict = "imprescindible" | "recomendado" | "situacional";

export interface GadgetSpec {
    label: string;
    value: string;
}

export interface GadgetConfigSnippet {
    label: string;
    code: string;
}

export interface Gadget {
    id: string;
    name: string;
    description: string;
    role: string;
    status: GadgetStatus;
    verdict: GadgetVerdict;
    specs: GadgetSpec[];
    pros: string[];
    limit: string;
    configSnippet?: GadgetConfigSnippet;
    replaces?: string;
    combosWith?: string[];
    projectIds?: string[];
    link?: string;
}

export interface GadgetCategory {
    id: string;
    title: string;
    code: string;
    description: string;
    items: Gadget[];
}

export interface GadgetWorkflow {
    id: string;
    title: string;
    description: string;
    steps: string[];
    gadgetIds: string[];
}

export const gadgetWorkflows: GadgetWorkflow[] = [
    {
        id: "flujo-hardware-agentes",
        title: "Diagnóstico de hardware con agentes",
        description: "Captura señales físicas en la mesa de trabajo y las analiza en terminal sin depender de servicios externos.",
        steps: [
            "Muestreo y envío de telemetría JSONL desde el ESP32-S3",
            "Inspección de tramas y validación automatizada con el agente de terminal",
        ],
        gadgetIds: ["esp32-s3-devkit", "agy-cli"],
    },
    {
        id: "flujo-edicion-estatica",
        title: "Iteración rápida de software estático",
        description: "Flujo diario para diseñar, verificar tipos, correr pruebas y exportar sitios estáticos listos para producción.",
        steps: [
            "Coordinación de cambios y pruebas unitarias desde la CLI de agentes",
            "Verificación de build estático y auditoría antes de publicar",
        ],
        gadgetIds: ["agy-cli"],
    },
];

export const gadgets: GadgetCategory[] = [
    {
        id: "estacion-agentes-software",
        title: "Estación de Software y Agentes",
        code: "SW-LAB // 01",
        description: "Herramientas de terminal y automatización que uso a diario para programar, auditar cambios y documentar sistemas.",
        items: [
            {
                id: "agy-cli",
                name: "Entorno de Agentes en Terminal (CLI + Sandbox)",
                role: "Coordinación de código, pruebas y diagnóstico técnico",
                description:
                    "Flujo de trabajo centrado en agentes desde la terminal con ejecución controlada, validación local de pruebas y revisión por capas.",
                status: "diario",
                verdict: "imprescindible",
                specs: [
                    { label: "Entorno", value: "macOS + zsh + Node 24" },
                    { label: "Modo", value: "Sandbox local + Git" },
                    { label: "Verificación", value: "Vitest + TypeScript + Build" },
                ],
                pros: [
                    "Mantiene el contexto del repositorio y de la documentación técnica",
                    "Permite validar cada cambio con pruebas reales antes de cerrar",
                    "Se integra con scripts locales y herramientas de hardware por CLI",
                ],
                limit: "Requiere reglas claras en el repositorio (AGENTS.md) para evitar sobreingeniería.",
                configSnippet: {
                    label: "Pipeline de validación local antes de publicar",
                    code: "npm audit --omit=dev --audit-level=high && npm run check",
                },
                replaces: "Reemplazó el uso de chats aislados fuera del repositorio que obligaban a copiar y pegar archivos manualmente.",
                combosWith: ["esp32-s3-devkit"],
                projectIds: ["monitor-nodo-pcb"],
                link: "https://michdmark.com/blog/agentes-locales-y-hardware-accesible/",
            },
        ],
    },
    {
        id: "banco-hardware-electronica",
        title: "Banco de Hardware y Prototipado",
        code: "HW-BENCH // 02",
        description: "Microcontroladores e instrumentación accesible para llevar ideas del software al mundo físico.",
        items: [
            {
                id: "esp32-s3-devkit",
                name: "Placa ESP32-S3 DevKitC (USB-CDC Nativo)",
                role: "Nodo principal para prototipos conectados y captura de sensores",
                description:
                    "Microcontrolador de doble núcleo con USB nativo que simplifica la telemetría bidireccional con la computadora sin puentes UART externos.",
                status: "por-proyecto",
                verdict: "recomendado",
                specs: [
                    { label: "Arquitectura", value: "Xtensa Dual-Core 240 MHz" },
                    { label: "Interfaz", value: "USB-CDC + I2C / SPI / ADC" },
                    { label: "Tensión lógica", value: "3.3 V" },
                ],
                pros: [
                    "Puerto USB nativo estable para enviar tramas estructuradas a baja latencia",
                    "Suficiente memoria para buffers locales antes de transmitir",
                    "Excelente relación costo-beneficio para repetir nodos en casa",
                ],
                limit: "El ADC integrado tiene no-linealidades en los extremos si no se calibra o atenúa por curva.",
                configSnippet: {
                    label: "Formato de trama JSONL que uso en pruebas de serie",
                    code: '{"t":1042,"vbus":3.31,"tempC":31.4,"i2cErr":0,"crc":"OK"}',
                },
                replaces: "Sustituyó placas de 8 bits cuando necesito instrumentación rápida con estructura JSONL y conectividad.",
                combosWith: ["agy-cli"],
                projectIds: ["monitor-nodo-pcb"],
                link: "https://michdmark.com/projects/",
            },
        ],
    },
];
