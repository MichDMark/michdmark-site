import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
    title: "Proyectos",
    description: "Proyectos de software y hardware de Mich DMark, con tecnología explicada de forma accesible.",
    alternates: {
        canonical: "/projects/",
    },
};

export default function ProjectsPage() {
    return (
        <Container className="page-shell">
            <SectionHeader
                title="Proyectos"
                eyebrow="SOFTWARE / HARDWARE"
                description="Un espacio para compartir proyectos y explicar cómo se construyen."
            />
            {projects.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                    {projects.map((project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </SimpleGrid>
            ) : (
                <Paper component="section" aria-label="Estado de proyectos" className="empty-state">
                    <Stack gap="xs">
                        <Text className="section-kicker">PROYECTOS / ARCHIVO</Text>
                        <Text className="empty-state-title">Contenido en preparación</Text>
                        <Text className="empty-state-description">
                            Aquí compartiré proyectos de software y hardware, junto con el proceso para hacerlos.
                        </Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
