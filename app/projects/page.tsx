import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
    title: "Projects | Mich",
    description: "A collection of my work.",
};

export default function ProjectsPage() {
    return (
        <Container className="py-24">
            <SectionHeader
                title="Proyectos"
                description="Proyectos que he realizado."
                className="mb-12"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        </Container>
    );
}
