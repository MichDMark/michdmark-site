export interface Gadget {
    name: string;
    description: string;
    link?: string;
}

export interface GadgetCategory {
    title: string;
    items: Gadget[];
}

export const gadgets: GadgetCategory[] = [];
