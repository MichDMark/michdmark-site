"use client";

import { useState } from "react";
import { Badge, Box, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import {
    IconAccessPoint,
    IconArrowRight,
    IconChevronDown,
    IconChevronUp,
    IconCpu,
    IconSparkles,
    IconTool,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import type { Post, PostKind } from "@/lib/posts";

interface BitacoraExplorerProps {
    posts: Post[];
}

const kindLabels: Record<PostKind, { label: string; code: string; color: string }> = {
    experimento: { label: "Experimento", code: "EXP // LAB", color: "brand" },
    ensayo: { label: "Ensayo", code: "ENS // IDEA", color: "cyan" },
    guia: { label: "Guía práctica", code: "GUI // PASO", color: "teal" },
    "nota-rapida": { label: "Nota de campo", code: "LOG // NOTA", color: "gray" },
};

export function BitacoraExplorer({ posts }: BitacoraExplorerProps) {
    const [activeKind, setActiveKind] = useState<PostKind | "todos">("todos");
    const [openSignals, setOpenSignals] = useState<Record<string, boolean>>(() =>
        posts[0] ? { [posts[0].slug]: true } : {},
    );

    const availableKinds = Array.from(
        new Set(posts.map((post) => post.kind).filter((kind): kind is PostKind => Boolean(kind))),
    );

    const filteredPosts =
        activeKind === "todos" ? posts : posts.filter((post) => (post.kind ?? "ensayo") === activeKind);

    const toggleSignals = (slug: string) => {
        setOpenSignals((current) => ({ ...current, [slug]: !current[slug] }));
    };

    return (
        <Stack gap="xl">
            <Paper p="md" radius="sm" withBorder className="content-card">
                <Stack gap="sm">
                    <Group justify="space-between" align="center" wrap="wrap" gap="xs">
                        <Group gap="xs">
                            <IconAccessPoint size={18} stroke={1.8} color="var(--site-accent)" />
                            <Text size="xs" fw={700} tt="uppercase" c="gray.2" style={{ letterSpacing: "0.08em" }}>
                                Bus de señales // Conmutador de formato
                            </Text>
                        </Group>
                        <Text size="xs" c="dimmed" ff="monospace">
                            {filteredPosts.length} {filteredPosts.length === 1 ? "transmisión activa" : "transmisiones activas"}
                        </Text>
                    </Group>

                    <Group gap="xs" wrap="wrap" role="group" aria-label="Filtrar entradas de la bitácora por tipo">
                        <Button
                            size="xs"
                            variant={activeKind === "todos" ? "filled" : "default"}
                            color="brand"
                            onClick={() => setActiveKind("todos")}
                        >
                            Todas ({posts.length})
                        </Button>
                        {availableKinds.map((kind) => {
                            const meta = kindLabels[kind];
                            return (
                                <Button
                                    key={kind}
                                    size="xs"
                                    variant={activeKind === kind ? "filled" : "default"}
                                    color="brand"
                                    onClick={() => setActiveKind(kind)}
                                >
                                    {meta.label}
                                </Button>
                            );
                        })}
                    </Group>
                </Stack>
            </Paper>

            <Stack gap="lg">
                {filteredPosts.map((post, index) => {
                    const formattedDate = format(parseISO(post.date), "d MMM yyyy", { locale: es });
                    const kindMeta = post.kind ? kindLabels[post.kind] : kindLabels.ensayo;
                    const signalsExpanded = Boolean(openSignals[post.slug]);

                    return (
                        <Paper
                            key={post.slug}
                            component="article"
                            p="lg"
                            radius="sm"
                            withBorder
                            className="content-card post-card"
                        >
                            <Stack gap="md">
                                <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                                    <Group gap="xs">
                                        <Badge variant="filled" color={kindMeta.color} radius="xs" size="sm">
                                            {kindMeta.code}
                                        </Badge>
                                        <Badge variant="outline" color="gray" radius="xs" size="sm">
                                            NODO #{String(posts.length - index).padStart(2, "0")}
                                        </Badge>
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="light" color="brand" radius="sm" size="sm">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </Group>

                                    <Text component="time" dateTime={post.date} c="gray.4" size="xs" ff="monospace" tt="uppercase">
                                        {formattedDate}
                                    </Text>
                                </Group>

                                <Box>
                                    <Title order={2} size="h3" c="gray.0" mb={6}>
                                        <Link
                                            href={`/blog/${post.slug}/`}
                                            style={{ color: "inherit", textDecoration: "none" }}
                                        >
                                            {post.title}
                                        </Link>
                                    </Title>
                                    <Text c="gray.4" size="sm" lh={1.75}>
                                        {post.description}
                                    </Text>
                                </Box>

                                {post.signals && post.signals.length > 0 && (
                                    <Box>
                                        <Button
                                            size="xs"
                                            variant="subtle"
                                            color="gray"
                                            leftSection={<IconSparkles size={15} stroke={1.8} />}
                                            rightSection={
                                                signalsExpanded ? (
                                                    <IconChevronUp size={15} stroke={1.8} />
                                                ) : (
                                                    <IconChevronDown size={15} stroke={1.8} />
                                                )
                                            }
                                            onClick={() => toggleSignals(post.slug)}
                                            aria-expanded={signalsExpanded}
                                        >
                                            {signalsExpanded
                                                ? "Ocultar señales clave (TL;DR)"
                                                : `Desplegar ${post.signals.length} señales clave (TL;DR)`}
                                        </Button>

                                        {signalsExpanded && (
                                            <Paper
                                                mt="xs"
                                                p="md"
                                                radius="xs"
                                                withBorder
                                                style={{
                                                    background: "rgba(6, 14, 21, 0.85)",
                                                    borderColor: "rgba(242, 22, 72, 0.35)",
                                                }}
                                            >
                                                <Stack gap="xs">
                                                    <Text size="xs" fw={700} tt="uppercase" c="brand.4" ff="monospace">
                                                        Síntesis rápida del registro
                                                    </Text>
                                                    {post.signals.map((signal, signalIndex) => (
                                                        <Group key={signal} align="flex-start" wrap="nowrap" gap="xs">
                                                            <Text size="xs" fw={700} c="brand.5" ff="monospace" mt={2}>
                                                                0{signalIndex + 1}
                                                            </Text>
                                                            <Text size="sm" c="gray.2" lh={1.6}>
                                                                {signal}
                                                            </Text>
                                                        </Group>
                                                    ))}
                                                </Stack>
                                            </Paper>
                                        )}
                                    </Box>
                                )}

                                <Group justify="space-between" align="center" wrap="wrap" gap="sm" pt="xs">
                                    <Group gap="xs" wrap="wrap">
                                        {post.relatedProjects && post.relatedProjects.length > 0 && (
                                            <Button
                                                component={Link}
                                                href="/projects/"
                                                size="xs"
                                                variant="default"
                                                leftSection={<IconCpu size={14} stroke={1.8} />}
                                            >
                                                Ver sistema en Proyectos ({post.relatedProjects.length})
                                            </Button>
                                        )}
                                        {post.relatedGadgets && post.relatedGadgets.length > 0 && (
                                            <Button
                                                component={Link}
                                                href="/setup/"
                                                size="xs"
                                                variant="default"
                                                leftSection={<IconTool size={14} stroke={1.8} />}
                                            >
                                                Herramientas involucradas ({post.relatedGadgets.length})
                                            </Button>
                                        )}
                                    </Group>

                                    <Button
                                        component={Link}
                                        href={`/blog/${post.slug}/`}
                                        size="xs"
                                        color="brand"
                                        variant="light"
                                        rightSection={<IconArrowRight size={14} stroke={2} />}
                                    >
                                        Abrir registro completo
                                    </Button>
                                </Group>
                            </Stack>
                        </Paper>
                    );
                })}
            </Stack>
        </Stack>
    );
}
