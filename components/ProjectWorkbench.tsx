"use client";

import { useState } from "react";
import { Anchor, Badge, Button, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import type { Project, ProjectDomain } from "@/data/projects";

interface ProjectWorkbenchProps {
    projects: Project[];
}

const domainLabels: Record<ProjectDomain, string> = {
    hibrido: "Híbrido (HW + SW)",
    hardware: "Hardware",
    software: "Software",
    agentes: "Agentes",
};

const statusLabels: Record<Project["status"], string> = {
    produccion: "En producción",
    prototipo: "Prototipo",
    experimento: "Experimento",
    archivado: "Archivado",
};

const roleLabels: Record<Project["blocks"][number]["role"], string> = {
    input: "Entrada",
    storage: "Almacenamiento",
    core: "Núcleo",
    output: "Salida",
};

const milestoneStatusLabels: Record<Project["milestones"][number]["status"], string> = {
    failed: "Fallo documentado",
    iterated: "Iteración técnica",
    shipped: "Versión funcional",
};

export function ProjectWorkbench({ projects }: ProjectWorkbenchProps) {
    const [activeDomain, setActiveDomain] = useState<ProjectDomain | "todos">("todos");
    const domains = Array.from(new Set(projects.map((project) => project.domain)));
    const visibleProjects = activeDomain === "todos"
        ? projects
        : projects.filter((project) => project.domain === activeDomain);

    return (
        <Stack gap="xl">
            <Paper p="md" radius="sm" withBorder className="content-card">
                <Group gap="xs" wrap="wrap" role="group" aria-label="Filtrar proyectos por dominio">
                    <Button size="xs" variant={activeDomain === "todos" ? "filled" : "default"} color="brand" onClick={() => setActiveDomain("todos")}>
                        Todos
                    </Button>
                    {domains.map((domain) => (
                        <Button key={domain} size="xs" variant={activeDomain === domain ? "filled" : "default"} color="brand" onClick={() => setActiveDomain(domain)}>
                            {domainLabels[domain]}
                        </Button>
                    ))}
                </Group>
            </Paper>

            <Stack gap="xl">
                {visibleProjects.map((project) => {
                    const scenario = project.simulation?.[0];
                    return (
                        <Paper key={project.id} id={project.id} component="article" p="lg" radius="sm" withBorder className="content-card">
                            <Stack gap="lg">
                                <header>
                                    <Group gap="xs" wrap="wrap" mb="xs">
                                        <Badge variant="filled" color="brand" radius="xs">{domainLabels[project.domain]}</Badge>
                                        <Badge variant="outline" color="cyan" radius="xs">{statusLabels[project.status]}</Badge>
                                    </Group>
                                    <Title order={2} size="h3" c="gray.0">{project.name}</Title>
                                    <Text c="gray.3" size="sm" fw={500} mt={4}>{project.tagline}</Text>
                                    <Text c="gray.4" size="sm" lh={1.65} mt="sm">{project.description}</Text>
                                    <Stack gap="xs" mt="sm">
                                        <Text size="sm" fw={700} c="gray.1">Tecnologías</Text>
                                        <Group gap="xs" wrap="wrap" aria-label="Tecnologías del proyecto">
                                            {project.stack.map((technology) => (
                                                <Badge key={technology} variant="light" color="gray" radius="sm">
                                                    {technology}
                                                </Badge>
                                            ))}
                                        </Group>
                                    </Stack>
                                </header>

                                <section aria-label="Métricas del proyecto">
                                    <Text component="h3" size="sm" fw={700} c="gray.1" mb="xs">Métricas</Text>
                                    <dl className="project-metrics-list">
                                        {project.metrics.map((metric) => (
                                            <div key={metric.label}>
                                                <dt>{metric.label}</dt>
                                                <dd>{metric.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section>

                                <section aria-label="Arquitectura del sistema">
                                    <Title order={3} size="h4" c="gray.1" mb="sm">Arquitectura del sistema</Title>
                                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                                        {project.blocks.map((block) => (
                                            <Paper key={block.id} component="article" p="md" radius="xs" withBorder style={{ background: "rgba(5, 11, 17, 0.8)" }}>
                                                <Stack gap={6}>
                                                    <Badge w="fit-content" size="xs" variant="light" color="cyan">{roleLabels[block.role]}</Badge>
                                                    <Text size="sm" fw={700} c="gray.0">{block.label.trim()}</Text>
                                                    <Text size="xs" c="cyan.2" ff="monospace">{block.tech}</Text>
                                                    <Text size="sm" c="gray.3" lh={1.6}>{block.detail}</Text>
                                                </Stack>
                                            </Paper>
                                        ))}
                                    </SimpleGrid>
                                </section>

                                <section aria-label="Traza real y evolución">
                                    <Title order={3} size="h4" c="gray.1" mb="sm">Traza real y evolución</Title>
                                    {scenario && (
                                        <Paper p="md" radius="xs" withBorder mb="md" style={{ background: "#04080d" }}>
                                            <Text size="sm" fw={700} c="gray.1" mb="xs">Ejemplo: {scenario.inputLabel}</Text>
                                            <pre style={{ margin: 0, overflowX: "auto", whiteSpace: "pre-wrap", color: "#dce7ee", fontFamily: "monospace", fontSize: "0.82rem" }}>
                                                <code>{[scenario.summary, ...scenario.trace, scenario.output].join("\n")}</code>
                                            </pre>
                                        </Paper>
                                    )}
                                    <ol>
                                        {project.milestones.map((milestone) => (
                                            <li key={milestone.version}>
                                                <Text component="span" size="sm" fw={700} c="gray.0">{milestone.version}: {milestone.title} </Text>
                                                <Badge size="xs" variant="light" color={milestone.status === "failed" ? "red" : milestone.status === "iterated" ? "yellow" : "teal"}>
                                                    {milestoneStatusLabels[milestone.status]}
                                                </Badge>
                                                <Text size="sm" c="gray.3" lh={1.6}>{milestone.outcome}</Text>
                                            </li>
                                        ))}
                                    </ol>
                                </section>

                                <footer aria-label="Referencias opcionales del proyecto">
                                    <Group gap="md" wrap="wrap">
                                        <Anchor href={project.url} size="xs" c="dimmed">Referencia del proyecto</Anchor>
                                        {project.relatedPostSlug && (
                                            <Anchor component={Link} href={`/blog/${project.relatedPostSlug}/`} size="xs" c="dimmed">
                                                Artículo relacionado
                                            </Anchor>
                                        )}
                                        {project.gadgetIds?.map((id) => (
                                            <Anchor key={id} component={Link} href={`/setup/#${id}`} size="xs" c="dimmed">
                                                {id}
                                            </Anchor>
                                        ))}
                                    </Group>
                                </footer>
                            </Stack>
                        </Paper>
                    );
                })}
            </Stack>
        </Stack>
    );
}
