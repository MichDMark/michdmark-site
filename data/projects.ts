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

export const projects: Project[] = [];
