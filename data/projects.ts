export interface Project {
    name: string;
    description: string;
    stack: string[];
    link?: string;
    repo?: string;
}

export const projects: Project[] = [
    {
        name: "Portfolio V1",
        description: "The website you are looking at right now. Built with Next.js 14.",
        stack: ["Next.js", "Tailwind CSS", "TypeScript"],
        repo: "https://github.com/mich/portfolio",
    },
    {
        name: "TaskMaster",
        description: "A productivity app for managing daily tasks and goals.",
        stack: ["React", "Node.js", "PostgreSQL"],
        link: "https://example.com/taskmaster",
    },
    {
        name: "WeatherCLI",
        description: "A command-line tool to check weather directly from your terminal.",
        stack: ["Go", "Cobra"],
        repo: "https://github.com/mich/weather-cli",
    },
];
