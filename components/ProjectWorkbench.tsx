"use client";

import { useState } from "react";
import { Anchor, Badge, Box, Button, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import {
    IconActivity,
    IconArrowRight,
    IconCpu,
    IconGitBranch,
    IconPlayerPlay,
    IconSparkles,
    IconTool,
} from "@tabler/icons-react";
import Link from "next/link";
import type { Project, ProjectDomain } from "@/data/projects";

interface ProjectWorkbenchProps {
    projects: Project[];
}

type WorkbenchTab = "arquitectura" | "simulador" | "evolucion";

const domainLabels: Record<ProjectDomain, string> = {
    hibrido: "Híbrido (HW + SW)",
    hardware: "Hardware",
    software: "Software",
    agentes: "Agentes",
};

const roleLabels: Record<Project["blocks"][number]["role"], { label: string; color: string }> = {
    input: { label: "ENTRADA // SENSOR", color: "cyan" },
    storage: { label: "BUFFER // DATOS", color: "blue" },
    core: { label: "NÚCLEO // AGENTE", color: "brand" },
    output: { label: "SALIDA // ACCIÓN", color: "teal" },
};

const milestoneStatusBadges: Record<
    Project["milestones"][number]["status"],
    { label: string; color: string }
> = {
    failed: { label: "Fallo documentado", color: "red" },
    iterated: { label: "Iteración técnica", color: "yellow" },
    shipped: { label: "Versión funcional", color: "teal" },
};

export function ProjectWorkbench({ projects }: ProjectWorkbenchProps) {
    const [activeDomain, setActiveDomain] = useState<ProjectDomain | "todos">("todos");
    const [activeTabByProject, setActiveTabByProject] = useState<Record<string, WorkbenchTab>>({});
    const [selectedBlockByProject, setSelectedBlockByProject] = useState<Record<string, string>>({});
    const [selectedScenarioByProject, setSelectedScenarioByProject] = useState<Record<string, string>>({});

    const domains = Array.from(new Set(projects.map((project) => project.domain)));
    const visibleProjects =
        activeDomain === "todos"
            ? projects
            : projects.filter((project) => project.domain === activeDomain);

    return (
        <Stack gap="xl">
            <Paper p="md" radius="sm" withBorder className="content-card">
                <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                    <Group gap="xs">
                        <IconCpu size={18} stroke={1.8} color="var(--site-cyan)" />
                        <Text size="xs" fw={700} tt="uppercase" c="gray.2" style={{ letterSpacing: "0.08em" }}>
                            Banco de pruebas // Inspector de sistemas
                        </Text>
                    </Group>

                    <Group gap="xs" wrap="wrap" role="group" aria-label="Filtrar proyectos por dominio">
                        <Button
                            size="xs"
                            variant={activeDomain === "todos" ? "filled" : "default"}
                            color="brand"
                            onClick={() => setActiveDomain("todos")}
                        >
                            Todos ({projects.length})
                        </Button>
                        {domains.map((domain) => (
                            <Button
                                key={domain}
                                size="xs"
                                variant={activeDomain === domain ? "filled" : "default"}
                                color="brand"
                                onClick={() => setActiveDomain(domain)}
                            >
                                {domainLabels[domain]}
                            </Button>
                        ))}
                    </Group>
                </Group>
            </Paper>

            <Stack gap="xl">
                {visibleProjects.map((project) => {
                    const activeTab = activeTabByProject[project.id] ?? "arquitectura";
                    const selectedBlockId = selectedBlockByProject[project.id] ?? project.blocks[0]?.id;
                    const activeBlock =
                        project.blocks.find((block) => block.id === selectedBlockId) ?? project.blocks[0];
                    const scenarios = project.simulation ?? [];
                    const selectedScenarioId =
                        selectedScenarioByProject[project.id] ?? scenarios[0]?.id;
                    const activeScenario =
                        scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];

                    return (
                        <Paper
                            key={project.id}
                            component="article"
                            p="lg"
                            radius="sm"
                            withBorder
                            className="content-card"
                        >
                            <Stack gap="lg">
                                <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
                                    <Stack gap={4}>
                                        <Group gap="xs" wrap="wrap">
                                            <Badge variant="filled" color="brand" radius="xs" size="sm">
                                                {domainLabels[project.domain]}
                                            </Badge>
                                            <Badge variant="outline" color="cyan" radius="xs" size="sm">
                                                ESTADO: {project.status.toUpperCase()}
                                            </Badge>
                                        </Group>
                                        <Title order={2} size="h3" c="gray.0">
                                            {project.name}
                                        </Title>
                                        <Text c="gray.3" size="sm" fw={500}>
                                            {project.tagline}
                                        </Text>
                                    </Stack>

                                    <Group gap="xs" wrap="wrap">
                                        {project.relatedPostSlug && (
                                            <Button
                                                component={Link}
                                                href={`/blog/${project.relatedPostSlug}/`}
                                                size="xs"
                                                variant="default"
                                                leftSection={<IconSparkles size={14} stroke={1.8} />}
                                            >
                                                Nota en Bitácora
                                            </Button>
                                        )}
                                        {project.gadgetIds && project.gadgetIds.length > 0 && (
                                            <Button
                                                component={Link}
                                                href="/setup/"
                                                size="xs"
                                                variant="default"
                                                leftSection={<IconTool size={14} stroke={1.8} />}
                                            >
                                                Gadgets del sistema ({project.gadgetIds.length})
                                            </Button>
                                        )}
                                    </Group>
                                </Group>

                                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                                    {project.metrics.map((metric) => (
                                        <Paper
                                            key={metric.label}
                                            p="sm"
                                            radius="xs"
                                            withBorder
                                            style={{ background: "rgba(5, 12, 18, 0.78)" }}
                                        >
                                            <Text size="xs" c="dimmed" tt="uppercase" ff="monospace">
                                                {metric.label}
                                            </Text>
                                            <Text size="md" fw={700} c="gray.0" ff="monospace">
                                                {metric.value}
                                            </Text>
                                        </Paper>
                                    ))}
                                </SimpleGrid>

                                <Group
                                    gap="xs"
                                    wrap="wrap"
                                    role="tablist"
                                    aria-label={`Capas de inspección de ${project.name}`}
                                >
                                    <Button
                                        size="xs"
                                        role="tab"
                                        aria-selected={activeTab === "arquitectura"}
                                        variant={activeTab === "arquitectura" ? "filled" : "default"}
                                        color="brand"
                                        leftSection={<IconCpu size={14} stroke={1.8} />}
                                        onClick={() =>
                                            setActiveTabByProject((curr) => ({
                                                ...curr,
                                                [project.id]: "arquitectura",
                                            }))
                                        }
                                    >
                                        01 / Arquitectura y Bloques
                                    </Button>
                                    {scenarios.length > 0 && (
                                        <Button
                                            size="xs"
                                            role="tab"
                                            aria-selected={activeTab === "simulador"}
                                            variant={activeTab === "simulador" ? "filled" : "default"}
                                            color="brand"
                                            leftSection={<IconPlayerPlay size={14} stroke={1.8} />}
                                            onClick={() =>
                                                setActiveTabByProject((curr) => ({
                                                    ...curr,
                                                    [project.id]: "simulador",
                                                }))
                                            }
                                        >
                                            02 / Simulador de Señal ({scenarios.length})
                                        </Button>
                                    )}
                                    <Button
                                        size="xs"
                                        role="tab"
                                        aria-selected={activeTab === "evolucion"}
                                        variant={activeTab === "evolucion" ? "filled" : "default"}
                                        color="brand"
                                        leftSection={<IconGitBranch size={14} stroke={1.8} />}
                                        onClick={() =>
                                            setActiveTabByProject((curr) => ({
                                                ...curr,
                                                [project.id]: "evolucion",
                                            }))
                                        }
                                    >
                                        03 / Evolución ({project.milestones[0]?.version} →{" "}
                                        {project.milestones[project.milestones.length - 1]?.version})
                                    </Button>
                                </Group>

                                {activeTab === "arquitectura" && (
                                    <Stack gap="md">
                                        <Text size="xs" c="gray.4" ff="monospace">
                                            Selecciona un bloque del sistema para inspeccionar su función y tecnología:
                                        </Text>
                                        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="sm">
                                            {project.blocks.map((block, index) => {
                                                const isSelected = activeBlock?.id === block.id;
                                                const roleMeta = roleLabels[block.role];
                                                return (
                                                    <Paper
                                                        key={block.id}
                                                        component="button"
                                                        type="button"
                                                        p="sm"
                                                        radius="xs"
                                                        withBorder
                                                        onClick={() =>
                                                            setSelectedBlockByProject((curr) => ({
                                                                ...curr,
                                                                [project.id]: block.id,
                                                            }))
                                                        }
                                                        style={{
                                                            textAlign: "left",
                                                            cursor: "pointer",
                                                            background: isSelected
                                                                ? "rgba(242, 22, 72, 0.12)"
                                                                : "rgba(7, 16, 24, 0.8)",
                                                            borderColor: isSelected
                                                                ? "var(--site-accent)"
                                                                : "rgba(67, 217, 255, 0.22)",
                                                        }}
                                                    >
                                                        <Stack gap={4}>
                                                            <Group justify="space-between" gap={4}>
                                                                <Badge
                                                                    size="xs"
                                                                    variant="light"
                                                                    color={roleMeta.color}
                                                                    radius="xs"
                                                                >
                                                                    {roleMeta.label}
                                                                </Badge>
                                                                <Text size="xs" c="dimmed" ff="monospace">
                                                                    B0{index + 1}
                                                                </Text>
                                                            </Group>
                                                            <Text size="sm" fw={700} c="gray.0">
                                                                {block.label}
                                                            </Text>
                                                            <Text size="xs" c="gray.4" ff="monospace">
                                                                {block.tech}
                                                            </Text>
                                                        </Stack>
                                                    </Paper>
                                                );
                                            })}
                                        </SimpleGrid>

                                        {activeBlock && (
                                            <Paper
                                                p="md"
                                                radius="xs"
                                                withBorder
                                                style={{
                                                    background: "rgba(5, 11, 17, 0.9)",
                                                    borderColor: "rgba(67, 217, 255, 0.35)",
                                                }}
                                            >
                                                <Stack gap={6}>
                                                    <Group justify="space-between" wrap="wrap" gap="xs">
                                                        <Text size="xs" fw={700} c="cyan.3" ff="monospace" tt="uppercase">
                                                            Inspección de nodo // {activeBlock.label}
                                                        </Text>
                                                        <Badge size="xs" variant="outline" color="gray">
                                                            {activeBlock.tech}
                                                        </Badge>
                                                    </Group>
                                                    <Text size="sm" c="gray.2" lh={1.65}>
                                                        {activeBlock.detail}
                                                    </Text>
                                                </Stack>
                                            </Paper>
                                        )}
                                    </Stack>
                                )}

                                {activeTab === "simulador" && activeScenario && (
                                    <Stack gap="md">
                                        <Group gap="xs" wrap="wrap">
                                            {scenarios.map((scenario) => (
                                                <Button
                                                    key={scenario.id}
                                                    size="xs"
                                                    variant={
                                                        activeScenario.id === scenario.id ? "light" : "default"
                                                    }
                                                    color="brand"
                                                    onClick={() =>
                                                        setSelectedScenarioByProject((curr) => ({
                                                            ...curr,
                                                            [project.id]: scenario.id,
                                                        }))
                                                    }
                                                >
                                                    {scenario.inputLabel}
                                                </Button>
                                            ))}
                                        </Group>

                                        <Paper
                                            p="md"
                                            radius="xs"
                                            withBorder
                                            style={{ background: "rgba(4, 10, 16, 0.92)" }}
                                        >
                                            <Stack gap="sm">
                                                <Group gap="xs">
                                                    <IconActivity size={16} stroke={1.8} color="var(--site-accent)" />
                                                    <Text size="xs" fw={700} c="gray.2" ff="monospace" tt="uppercase">
                                                        Escenario activo: {activeScenario.summary}
                                                    </Text>
                                                </Group>

                                                <Box
                                                    component="pre"
                                                    p="sm"
                                                    style={{
                                                        margin: 0,
                                                        overflowX: "auto",
                                                        borderRadius: 4,
                                                        background: "#04080d",
                                                        border: "1px solid rgba(67, 217, 255, 0.2)",
                                                        fontFamily: "monospace",
                                                        fontSize: "0.8rem",
                                                        color: "#c8d6df",
                                                    }}
                                                >
                                                    {activeScenario.trace.join("\n")}
                                                </Box>

                                                <Paper
                                                    p="sm"
                                                    radius="xs"
                                                    withBorder
                                                    style={{
                                                        background: "rgba(242, 22, 72, 0.08)",
                                                        borderColor: "rgba(242, 22, 72, 0.36)",
                                                    }}
                                                >
                                                    <Text size="xs" fw={700} c="brand.4" ff="monospace" mb={4}>
                                                        SALIDA DEL DIAGNÓSTICO
                                                    </Text>
                                                    <Text size="sm" c="gray.1" lh={1.6}>
                                                        {activeScenario.output}
                                                    </Text>
                                                </Paper>
                                            </Stack>
                                        </Paper>
                                    </Stack>
                                )}

                                {activeTab === "evolucion" && (
                                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="sm">
                                        {project.milestones.map((milestone) => {
                                            const badge = milestoneStatusBadges[milestone.status];
                                            return (
                                                <Paper
                                                    key={milestone.version}
                                                    p="md"
                                                    radius="xs"
                                                    withBorder
                                                    style={{ background: "rgba(6, 14, 21, 0.85)" }}
                                                >
                                                    <Stack gap="xs">
                                                        <Group justify="space-between" align="center">
                                                            <Text fw={700} c="gray.0" ff="monospace">
                                                                {milestone.version}
                                                            </Text>
                                                            <Badge size="xs" color={badge.color} variant="light">
                                                                {badge.label}
                                                            </Badge>
                                                        </Group>
                                                        <Text size="sm" fw={600} c="gray.1">
                                                            {milestone.title}
                                                        </Text>
                                                        <Text size="xs" c="gray.4" lh={1.65}>
                                                            {milestone.outcome}
                                                        </Text>
                                                    </Stack>
                                                </Paper>
                                            );
                                        })}
                                    </SimpleGrid>
                                )}

                                <Group justify="space-between" align="center" wrap="wrap" gap="sm" pt="xs">
                                    <Group gap={6} wrap="wrap">
                                        {project.stack.map((tech) => (
                                            <Badge key={tech} variant="outline" color="gray" radius="xs" size="sm">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </Group>

                                    {project.url && (
                                        <Anchor
                                            href={project.url}
                                            size="xs"
                                            fw={700}
                                            c="brand.4"
                                            tt="uppercase"
                                        >
                                            Referencia del proyecto{" "}
                                            <IconArrowRight
                                                size={13}
                                                stroke={2}
                                                style={{ verticalAlign: "middle" }}
                                            />
                                        </Anchor>
                                    )}
                                </Group>
                            </Stack>
                        </Paper>
                    );
                })}
            </Stack>
        </Stack>
    );
}
