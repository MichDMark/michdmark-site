
import { Badge, Card, Group, Stack, Text, Title, Anchor } from "@mantine/core";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card padding="lg" radius="lg" withBorder h="100%" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
            <Stack gap="md" h="100%">
                <Stack gap={4}>
                    <Title order={3} size="h4" c="gray.0">{project.name}</Title>

                    {project.url && (
                        <Anchor
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="sm"
                            c="brand.5"
                        >
                            Visitar sitio →
                        </Anchor>
                    )}
                </Stack>
                <Text c="gray.5" size="sm" lh={1.7}>{project.description}</Text>
                {project.stack?.length ? (
                    <Group gap={6} mt="auto">
                    {project.stack.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            color="gray"
                            radius="sm"
                        >
                            {tech}
                        </Badge>
                    ))}
                    </Group>
                ) : null}
            </Stack>
        </Card>
    );
}
