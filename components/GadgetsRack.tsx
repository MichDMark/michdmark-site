"use client";

import { useState } from "react";
import { Anchor, Badge, Box, Button, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import type { GadgetCategory, GadgetStatus, GadgetVerdict } from "@/data/gadgets";

interface GadgetsRackProps {
    categories: GadgetCategory[];
}

const statusBadges: Record<GadgetStatus, { label: string; color: string }> = {
    diario: { label: "Uso diario", color: "teal" },
    "por-proyecto": { label: "Por proyecto", color: "cyan" },
    "en-pruebas": { label: "En pruebas", color: "yellow" },
    reemplazado: { label: "Reemplazado", color: "gray" },
};

const verdictBadges: Record<GadgetVerdict, { label: string; color: string }> = {
    imprescindible: { label: "Imprescindible", color: "brand" },
    recomendado: { label: "Recomendado", color: "cyan" },
    situacional: { label: "Situacional", color: "gray" },
};

export function GadgetsRack({ categories }: GadgetsRackProps) {
    const [activeCategory, setActiveCategory] = useState("todas");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const visibleCategories = activeCategory === "todas"
        ? categories
        : categories.filter((category) => category.id === activeCategory);

    const copyConfig = async (id: string, code: string) => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(code);
                setCopiedId(id);
                window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 2000);
            }
        } catch {
            // El bloque de código permanece visible y se puede copiar manualmente.
        }
    };

    return (
        <Stack gap="xl">
            <Paper p="md" radius="sm" withBorder className="content-card">
                <Group gap="xs" wrap="wrap" role="group" aria-label="Filtrar gadgets por estación">
                    <Button size="xs" variant={activeCategory === "todas" ? "filled" : "default"} color="brand" onClick={() => setActiveCategory("todas")}>
                        Todas
                    </Button>
                    {categories.map((category) => (
                        <Button key={category.id} size="xs" variant={activeCategory === category.id ? "filled" : "default"} color="brand" onClick={() => setActiveCategory(category.id)}>
                            {category.title}
                        </Button>
                    ))}
                </Group>
            </Paper>

            {visibleCategories.map((category) => (
                <section key={category.id} aria-labelledby={`${category.id}-title`}>
                    <Stack gap="md">
                        <Box pl="md" style={{ borderLeft: "2px solid var(--site-accent)" }}>
                            <Title id={`${category.id}-title`} order={2} size="h3" c="white">{category.title}</Title>
                            <Text size="sm" c="gray.4">{category.description}</Text>
                        </Box>
                        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
                            {category.items.map((item) => {
                                const status = statusBadges[item.status];
                                const verdict = verdictBadges[item.verdict];
                                return (
                                    <Paper key={item.id} id={item.id} component="article" p="lg" radius="sm" withBorder className="content-card">
                                        <Stack gap="md" h="100%">
                                            <header>
                                                <Group gap="xs" wrap="wrap" mb="xs">
                                                    <Badge size="sm" variant="light" color={status.color}>{status.label}</Badge>
                                                    <Badge size="sm" variant="outline" color={verdict.color}>{verdict.label}</Badge>
                                                </Group>
                                                <Title order={3} size="h4" c="gray.0">{item.name}</Title>
                                                <Text size="sm" fw={700} c="cyan.3" mt={4}>{item.role}</Text>
                                                <Text size="sm" c="gray.4" lh={1.65} mt="xs">{item.description}</Text>
                                            </header>

                                            <dl className="gadget-spec-list">
                                                {item.specs.map((spec) => (
                                                    <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
                                                ))}
                                            </dl>

                                            <section aria-label="Puntos fuertes y límites">
                                                <Text component="h4" size="sm" fw={700} c="gray.1" mb="xs">Puntos fuertes</Text>
                                                <ul>{item.pros.map((pro) => <li key={pro}><Text component="span" size="sm" c="gray.3">+ {pro}</Text></li>)}</ul>
                                                <Text size="sm" c="brand.3" mt="xs">! Límite real: {item.limit}</Text>
                                                {item.replaces && <Text size="sm" c="gray.4" mt="xs">Reemplazo: {item.replaces}</Text>}
                                            </section>

                                            <Paper p="sm" radius="xs" withBorder style={{ background: "#04080d" }}>
                                                <Group justify="space-between" align="center" gap="xs" mb="xs">
                                                    <Text size="sm" c="gray.3">{item.configSnippet.label}</Text>
                                                    <Button size="compact-xs" variant="light" color="brand" leftSection={copiedId === item.id ? <IconCheck size={12} /> : <IconCopy size={12} />} onClick={() => copyConfig(item.id, item.configSnippet.code)}>
                                                        {copiedId === item.id ? "Copiado" : "Copiar"}
                                                    </Button>
                                                </Group>
                                                <pre style={{ margin: 0, padding: "0.5rem", overflowX: "auto", fontFamily: "monospace", fontSize: "0.78rem", color: "#dce7ee" }}>
                                                    <code>{item.configSnippet.code}</code>
                                                </pre>
                                            </Paper>

                                            {(item.projectIds?.length || item.relatedPostSlug) && (
                                                <footer aria-label="Referencias opcionales del gadget">
                                                    <Group gap="md" wrap="wrap" mt="auto">
                                                        <Text size="xs" c="dimmed">Relacionado:</Text>
                                                        {item.projectIds?.map((id) => (
                                                            <Anchor key={id} href={`/projects/#${id}`} size="xs" c="dimmed">
                                                                {id}
                                                            </Anchor>
                                                        ))}
                                                        {item.relatedPostSlug && (
                                                            <Anchor href={`/blog/${item.relatedPostSlug}/`} size="xs" c="dimmed">
                                                                Bitácora
                                                            </Anchor>
                                                        )}
                                                    </Group>
                                                </footer>
                                            )}
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </SimpleGrid>
                    </Stack>
                </section>
            ))}
        </Stack>
    );
}
