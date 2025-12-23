export interface Gadget {
    name: string;
    description: string;
    link?: string;
}

export interface GadgetCategory {
    title: string;
    items: Gadget[];
}

export const gadgets: GadgetCategory[] = [
    {
        title: "Equipo principal",
        items: [
            {
                name: "Macbook Pro 13 M2",
                description:
                    "Mi equipo principal para desarrollo, redacción y edición de video, uso de Agentes de IA. Aunque ya tiene unos años puede sacar el trabajo sin problemas.",
            },
            {
                name: "iPad Pro 12.9 M2",
                description:
                    "Es un gran complemento para el trabajo, especialmente cuando necesito algo ligero, puedo realizar todo excepto proyectos de desarrollo mas complejos.",
            },
        ],
    },
    {
        title: "Periféricos",
        items: [
            {
                name: "Teclado: Logitech POP KEY / Mouse: Logitech Lift",
                description:
                    "Usar un mouse vertical es muy cómodo para jornadas largas y un teclado mecánico básico mejora la escritura.",
            },
            {
                name: "Airpods Max",
                description:
                    "Mis audífonos de diadema, siempre en mi escritorio, aunque ya tienen algo de tiempo, el sonido es bueno y la cancelación de ruido junto con la integración de todo el ecosistema Apple me da mucha velocidad.",
            },
            {
                name: "Beats Fit Pro",
                description:
                    "Mis audífonos siempre en mi bolsillo, tienen mucho tiempo en el mercado pero la sujeción al oído te da ese plus para ir al gym y no estar cuidando que se caigan",
            },
        ],
    },

    {
        title: "Extras",
        items: [
            {
                name: "Café",
                description:
                    "Un buen café en el escritorio hace toda la diferencia.",
            },
        ],
    },
];