export type ProjectDomain = "software" | "hardware" | "hibrido" | "agentes";
export type ProjectStatus = "produccion" | "prototipo" | "experimento" | "archivado";

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectBlock {
    id: string;
    label: string;
    role: "input" | "core" | "output" | "storage";
    tech: string;
    detail: string;
}

export interface ProjectMilestone {
    version: string;
    title: string;
    outcome: string;
    status: "failed" | "iterated" | "shipped";
}

export interface ProjectSimulationScenario {
    id: string;
    inputLabel: string;
    summary: string;
    trace: string[];
    output: string;
}

export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    domain: ProjectDomain;
    status: ProjectStatus;
    stack: string[];
    url: string;
    metrics: ProjectMetric[];
    blocks: ProjectBlock[];
    milestones: ProjectMilestone[];
    simulation?: ProjectSimulationScenario[];
    gadgetIds?: string[];
    relatedPostSlug?: string;
}

export const projects: Project[] = [
    {
        id: "monitor-nodo-pcb",
        name: "Nodo de Telemetría y Diagnóstico con Agentes",
        tagline: "Lectura de sensores en ESP32-S3 conectada a un agente local para detectar anomalías sin depender de la nube.",
        description:
            "Sistema híbrido que captura tramas seriales desde una placa ESP32-S3, normaliza las señales en local y permite consultar o simular diagnósticos mediante un agente de terminal.",
        domain: "hibrido",
        status: "prototipo",
        stack: ["ESP32-S3", "TypeScript", "Node.js", "UART / JSONL"],
        url: "https://michdmark.com/projects/",
        metrics: [
            { label: "Muestreo", value: "50 Hz" },
            { label: "Consumo medio", value: "28 mA" },
            { label: "Latencia local", value: "< 15 ms" },
            { label: "Dependencia cloud", value: "0%" },
        ],
        blocks: [
            {
                id: "bloque-captura",
                label: " Etapa de Captura Física",
                role: "input",
                tech: "ESP32-S3 + ADC / I2C",
                detail: "Muestrea tensión del riel de alimentación y temperatura de placa, emitiendo tramas compactas con checksum por USB-CDC.",
            },
            {
                id: "bloque-normalizador",
                label: "Colector y Ring Buffer",
                role: "storage",
                tech: "Node.js + JSONL local",
                detail: "Filtra ruido de arranque, conserva las últimas 500 muestras en memoria y guarda instantáneas reproducibles en disco.",
            },
            {
                id: "bloque-agente",
                label: "Agente de Diagnóstico",
                role: "core",
                tech: "Reglas deterministas + Agente CLI",
                detail: "Cruza caídas de tensión con picos de consumo y explica en lenguaje llano qué componente o pin revisar primero.",
            },
            {
                id: "bloque-panel",
                label: "Reporte y Señal de Alerta",
                role: "output",
                tech: "CLI + Export estático",
                detail: "Genera un dictamen accionable con los pasos de verificación en multímetro u osciloscopio.",
            },
        ],
        simulation: [
            {
                id: "escenario-nominal",
                inputLabel: "Arranque nominal (3.31 V estables)",
                summary: "El nodo inicia sin caídas de tensión durante la activación del radio.",
                trace: [
                    "[00:00.012] UART RX -> { vbus: 3.31, tempC: 31.4, currentMa: 26.8, crc: 'OK' }",
                    "[00:00.018] RingBuffer -> Ventana de 60 muestras estable (variación < 0.02 V)",
                    "[00:00.024] Inspector -> Riel 3V3 dentro de tolerancia; sin reintentos de bus I2C",
                ],
                output: "ESTADO NOMINAL: Alimentación limpia en 3.31 V y rizado controlado. No se requieren ajustes en desacoplo.",
            },
            {
                id: "escenario-caida-riel",
                inputLabel: "Caída en riel 3V3 al activar carga (2.78 V)",
                summary: "Simula un pico de corriente que provoca un brownout parcial en la placa.",
                trace: [
                    "[00:01.104] UART RX -> { vbus: 2.78, tempC: 36.2, currentMa: 185.0, crc: 'OK' }",
                    "[00:01.109] RingBuffer -> Anomalía detectada: caída de 530 mV en 4 ms",
                    "[00:01.116] Agente -> Correlación alta con falta de capacitancia local o regulador LDO saturado",
                ],
                output: "ALERTA DE RIEL: Caída a 2.78 V bajo pico de 185 mA. Revisar capacitor de desacoplo cercano al pin 3V3 y caída del cable USB.",
            },
            {
                id: "escenario-ruido-i2c",
                inputLabel: "Tramas con reintentos en bus de sensores",
                summary: "El bus I2C reporta timeouts intermitentes al subir la frecuencia de reloj.",
                trace: [
                    "[00:02.410] UART RX -> { vbus: 3.29, i2cErrors: 7, pullupOhm: 10000, crc: 'OK' }",
                    "[00:02.416] RingBuffer -> Tasa de error del 14% en lecturas consecutivas a 400 kHz",
                    "[00:02.423] Agente -> Flancos lentos probables en SDA/SCL por resistencias pull-up altas",
                ],
                output: "DIAGNÓSTICO DE BUS: 7 errores I2C a 400 kHz. Bajar velocidad a 100 kHz o sustituir resistencias pull-up de 10 kΩ por 4.7 kΩ.",
            },
        ],
        milestones: [
            {
                version: "v0.1",
                title: "Lectura cruda por puerto serie",
                outcome: "Fallaba al abrir el monitor: el reset automático del puerto cortaba las primeras tramas y mezclaba logs de boot con datos.",
                status: "failed",
            },
            {
                version: "v0.2",
                title: "Protocolo con delimitador y checksum",
                outcome: "Se separaron los paquetes con formato JSONL validado y ventana circular para ignorar basura de inicialización.",
                status: "iterated",
            },
            {
                version: "v1.0",
                title: "Inspector asistido por escenarios",
                outcome: "Integración con el flujo de terminal para diagnosticar caídas de tensión y errores de bus con trazas reproducibles.",
                status: "shipped",
            },
        ],
        gadgetIds: ["esp32-s3-devkit", "agy-cli"],
        relatedPostSlug: "agentes-locales-y-hardware-accesible",
    },
];
