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
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Proyectos"
                description="Un espacio para compartir proyectos y explicar cómo se construyen."
                mb="xl"
            />
            {projects.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                    {projects.map((project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </SimpleGrid>
            ) : (
                <Paper p="xl" radius="lg" withBorder style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                    <Stack gap="xs">
                        <Text fw={600} c="white">Contenido en preparación</Text>
                        <Text c="gray.4">Aquí compartiré proyectos de software y hardware, junto con el proceso para hacerlos.</Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
