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
    configSnippet: GadgetConfigSnippet;
    replaces?: string;
    combosWith?: string[];
    projectIds?: string[];
    relatedPostSlug?: string;
    link?: string;
}

export interface GadgetCategory {
    id: string;
    title: string;
    code: string;
    description: string;
    items: Gadget[];
}

export const gadgets: GadgetCategory[] = [];
