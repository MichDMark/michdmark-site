import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { ConnectionNetwork } from "@/components/ConnectionNetwork";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "Proyectos",
    "Proyectos de software y hardware de Mich DMark, con tecnología explicada de forma accesible.",
    "/projects/",
);

export default function ProjectsPage() {
    return (
        <Container className="page-shell">
            <ConnectionNetwork className="page-composition single-target-composition">
                <section className="connected-origin page-origin">
                    <SectionHeader
                        title="Proyectos"
                        eyebrow="SOFTWARE / HARDWARE"
                        description="Un espacio para compartir proyectos y explicar cómo se construyen."
                        connectionSource
                    />
                </section>
                <section className="connected-target page-content-target" data-connection-target="contenido" aria-label="Contenido de proyectos">
                    <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
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
                </section>
            </ConnectionNetwork>
        </Container>
    );
}
