export interface Project {
    name: string;
    description: string;
    stack: string[];
    url: string;

}

export const projects = [
    {
        name: "Catálogo IVVY",
        stack: ["Next.js", "Tailwind CSS", "TypeScript"],
        description:
            "Catálogo web para productos, venta de mayore y menudeo.",
        url: "https://productosivvy.com",
    },
];
