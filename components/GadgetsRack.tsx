"use client";

import { useState } from "react";
import { Badge, Box, Button, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import {
    IconBolt,
    IconCheck,
    IconCopy,
    IconCpu,
    IconTerminal2,
    IconTool,
} from "@tabler/icons-react";
import Link from "next/link";
import type { GadgetCategory, GadgetStatus, GadgetVerdict, GadgetWorkflow } from "@/data/gadgets";

interface GadgetsRackProps {
    categories: GadgetCategory[];
    workflows: GadgetWorkflow[];
}

const statusBadges: Record<GadgetStatus, { label: string; color: string }> = {
    diario: { label: "USO DIARIO", color: "teal" },
    "por-proyecto": { label: "POR PROYECTO", color: "cyan" },
    "en-pruebas": { label: "EN PRUEBAS", color: "yellow" },
    reemplazado: { label: "ARCHIVADO", color: "gray" },
};

const verdictBadges: Record<GadgetVerdict, { label: string; color: string }> = {
    imprescindible: { label: "VEREDICTO: IMPRESCINDIBLE", color: "brand" },
    recomendado: { label: "VEREDICTO: RECOMENDADO", color: "cyan" },
    situacional: { label: "VEREDICTO: SITUACIONAL", color: "gray" },
};

export function GadgetsRack({ categories, workflows }: GadgetsRackProps) {
    const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
    const [openConfigs, setOpenConfigs] = useState<Record<string, boolean>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const activeWorkflow = workflows.find((workflow) => workflow.id === activeWorkflowId) ?? null;

    const toggleConfig = (id: string) => {
        setOpenConfigs((current) => ({ ...current, [id]: !current[id] }));
    };

    const copyConfig = async (id: string, code: string) => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(code);
                setCopiedId(id);
                window.setTimeout(() => {
                    setCopiedId((current) => (current === id ? null : current));
                }, 2000);
            }
        } catch {
            // El bloque de código permanece seleccionable manualmente
        }
    };

    return (
        <Stack gap="xl">
            {workflows.length > 0 && (
                <Paper p="md" radius="sm" withBorder className="content-card">
                    <Stack gap="sm">
                        <Group justify="space-between" align="center" wrap="wrap" gap="xs">
                            <Group gap="xs">
                                <IconBolt size={18} stroke={1.8} color="var(--site-accent)" />
                                <Text size="xs" fw={700} tt="uppercase" c="gray.2" style={{ letterSpacing: "0.08em" }}>
                                    Simulador de flujo de trabajo // ¿Qué herramientas se encienden juntas?
                                </Text>
                            </Group>
                            {activeWorkflow && (
                                <Button
                                    size="xs"
                                    variant="subtle"
                                    color="gray"
                                    onClick={() => setActiveWorkflowId(null)}
                                >
                                    Mostrar todas las estaciones
                                </Button>
                            )}
                        </Group>

                        <Group gap="xs" wrap="wrap" role="group" aria-label="Simular flujo de herramientas">
                            {workflows.map((workflow) => {
                                const selected = activeWorkflowId === workflow.id;
                                return (
                                    <Button
                                        key={workflow.id}
                                        size="xs"
                                        variant={selected ? "filled" : "default"}
                                        color="brand"
                                        onClick={() =>
                                            setActiveWorkflowId((current) =>
                                                current === workflow.id ? null : workflow.id,
                                            )
                                        }
                                    >
                                        {workflow.title}
                                    </Button>
                                );
                            })}
                        </Group>

                        {activeWorkflow && (
                            <Paper
                                p="sm"
                                radius="xs"
                                withBorder
                                style={{
                                    background: "rgba(242, 22, 72, 0.08)",
                                    borderColor: "rgba(242, 22, 72, 0.36)",
                                }}
                            >
                                <Stack gap={6}>
                                    <Text size="xs" fw={700} c="brand.4" ff="monospace" tt="uppercase">
                                        Pipeline activo // {activeWorkflow.title}
                                    </Text>
                                    <Text size="sm" c="gray.2">
                                        {activeWorkflow.description}
                                    </Text>
                                    <Group gap="md" wrap="wrap">
                                        {activeWorkflow.steps.map((step, index) => (
                                            <Text key={step} size="xs" c="gray.3" ff="monospace">
                                                {index + 1}. {step}
                                            </Text>
                                        ))}
                                    </Group>
                                </Stack>
                            </Paper>
                        )}
                    </Stack>
                </Paper>
            )}

            <Stack gap={40}>
                {categories.map((category) => (
                    <Stack key={category.id} gap="md">
                        <Box pl="md" style={{ borderLeft: "2px solid var(--site-accent)" }}>
                            <Group gap="xs" align="center">
                                <Text size="xs" fw={700} c="brand.4" ff="monospace">
                                    {category.code}
                                </Text>
                            </Group>
                            <Title order={2} size="h3" c="white">
                                {category.title}
                            </Title>
                            <Text size="sm" c="gray.4">
                                {category.description}
                            </Text>
                        </Box>

                        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
                            {category.items.map((item) => {
                                const isHighlighted =
                                    !activeWorkflow || activeWorkflow.gadgetIds.includes(item.id);
                                const statusMeta = statusBadges[item.status];
                                const verdictMeta = verdictBadges[item.verdict];
                                const configExpanded = Boolean(openConfigs[item.id]);

                                return (
                                    <Paper
                                        key={item.id}
                                        component="article"
                                        p="lg"
                                        radius="sm"
                                        withBorder
                                        className="content-card"
                                        style={{
                                            opacity: isHighlighted ? 1 : 0.42,
                                            borderColor:
                                                activeWorkflow && isHighlighted
                                                    ? "var(--site-accent)"
                                                    : undefined,
                                        }}
                                    >
                                        <Stack gap="md" h="100%">
                                            <Group justify="space-between" align="flex-start" gap="xs" wrap="wrap">
                                                <Group gap="xs" wrap="wrap">
                                                    <Badge size="xs" variant="light" color={statusMeta.color}>
                                                        {statusMeta.label}
                                                    </Badge>
                                                    <Badge size="xs" variant="outline" color={verdictMeta.color}>
                                                        {verdictMeta.label}
                                                    </Badge>
                                                </Group>
                                                <Text size="xs" c="dimmed" ff="monospace">
                                                    ID // {item.id}
                                                </Text>
                                            </Group>

                                            <Box>
                                                <Title order={3} size="h4" c="gray.0" mb={4}>
                                                    {item.name}
                                                </Title>
                                                <Text size="xs" fw={700} c="cyan.3" ff="monospace" mb={6}>
                                                    ROL: {item.role}
                                                </Text>
                                                <Text size="sm" c="gray.4" lh={1.65}>
                                                    {item.description}
                                                </Text>
                                            </Box>

                                            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs">
                                                {item.specs.map((spec) => (
                                                    <Paper
                                                        key={spec.label}
                                                        p="xs"
                                                        radius="xs"
                                                        withBorder
                                                        style={{ background: "rgba(5, 11, 17, 0.8)" }}
                                                    >
                                                        <Text size="xs" c="dimmed" ff="monospace">
                                                            {spec.label}
                                                        </Text>
                                                        <Text size="xs" fw={700} c="gray.1" ff="monospace">
                                                            {spec.value}
                                                        </Text>
                                                    </Paper>
                                                ))}
                                            </SimpleGrid>

                                            <Stack gap={6}>
                                                <Text size="xs" fw={700} c="gray.2" tt="uppercase" ff="monospace">
                                                    Por qué está en mi taller:
                                                </Text>
                                                {item.pros.map((pro) => (
                                                    <Text key={pro} size="xs" c="gray.3" lh={1.55}>
                                                        + {pro}
                                                    </Text>
                                                ))}
                                                <Text size="xs" c="brand.3" lh={1.55} mt={4}>
                                                    ! Límite real: {item.limit}
                                                </Text>
                                                {item.replaces && (
                                                    <Text size="xs" c="dimmed" lh={1.55}>
                                                        ↺ Evolución: {item.replaces}
                                                    </Text>
                                                )}
                                            </Stack>

                                            {item.configSnippet && (
                                                <Box mt="auto">
                                                    <Group justify="space-between" align="center" wrap="wrap" gap="xs">
                                                        <Button
                                                            size="xs"
                                                            variant="subtle"
                                                            color="gray"
                                                            leftSection={<IconTerminal2 size={15} stroke={1.8} />}
                                                            onClick={() => toggleConfig(item.id)}
                                                            aria-expanded={configExpanded}
                                                        >
                                                            {configExpanded
                                                                ? "Ocultar receta / configuración"
                                                                : "Ver receta / configuración real"}
                                                        </Button>

                                                        {item.projectIds && item.projectIds.length > 0 && (
                                                            <Button
                                                                component={Link}
                                                                href="/projects/"
                                                                size="xs"
                                                                variant="default"
                                                                leftSection={<IconCpu size={14} stroke={1.8} />}
                                                            >
                                                                Usado en {item.projectIds.length} proyecto(s)
                                                            </Button>
                                                        )}
                                                    </Group>

                                                    {configExpanded && (
                                                        <Paper
                                                            mt="xs"
                                                            p="sm"
                                                            radius="xs"
                                                            withBorder
                                                            style={{ background: "#04080d" }}
                                                        >
                                                            <Stack gap="xs">
                                                                <Group justify="space-between" align="center" gap="xs">
                                                                    <Text size="xs" c="gray.4" ff="monospace">
                                                                        {item.configSnippet.label}
                                                                    </Text>
                                                                    <Button
                                                                        size="compact-xs"
                                                                        variant="light"
                                                                        color="brand"
                                                                        leftSection={
                                                                            copiedId === item.id ? (
                                                                                <IconCheck size={12} />
                                                                            ) : (
                                                                                <IconCopy size={12} />
                                                                            )
                                                                        }
                                                                        onClick={() =>
                                                                            copyConfig(
                                                                                item.id,
                                                                                item.configSnippet!.code,
                                                                            )
                                                                        }
                                                                    >
                                                                        {copiedId === item.id
                                                                            ? "Copiado"
                                                                            : "Copiar"}
                                                                    </Button>
                                                                </Group>
                                                                <Box
                                                                    component="pre"
                                                                    p="xs"
                                                                    style={{
                                                                        margin: 0,
                                                                        overflowX: "auto",
                                                                        fontFamily: "monospace",
                                                                        fontSize: "0.78rem",
                                                                        color: "#dce7ee",
                                                                    }}
                                                                >
                                                                    {item.configSnippet.code}
                                                                </Box>
                                                            </Stack>
                                                        </Paper>
                                                    )}
                                                </Box>
                                            )}

                                            {!item.configSnippet && item.projectIds && item.projectIds.length > 0 && (
                                                <Group justify="flex-end" mt="auto">
                                                    <Button
                                                        component={Link}
                                                        href="/projects/"
                                                        size="xs"
                                                        variant="default"
                                                        leftSection={<IconTool size={14} stroke={1.8} />}
                                                    >
                                                        Ver proyecto asociado
                                                    </Button>
                                                </Group>
                                            )}
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </SimpleGrid>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
