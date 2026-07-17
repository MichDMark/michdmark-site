import { SimpleGrid } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
    title: "Proyectos | Mich",
    description: "Una colección de mis proyectos.",
    alternates: {
        canonical: "/projects/",
    },
};

export default function ProjectsPage() {
    return (
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Proyectos"
                description="Proyectos que he realizado."
                mb="xl"
            />
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </SimpleGrid>
        </Container>
    );
}
