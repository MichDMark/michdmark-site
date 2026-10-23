import { Badge, Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { IconArrowLeft, IconCpu, IconSparkles, IconTool } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { CircuitDetails } from "@/components/CircuitDetails";
import { Container } from "@/components/Container";
import { PcbCircuit } from "@/components/PcbCircuit";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { createPageMetadata } from "@/lib/site";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return createPageMetadata("Bitácora", "Entrada no encontrada.", "/blog/");
    }

    return createPageMetadata(post.title, post.description, `/blog/${post.slug}/`);
}

export default async function BlogPostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es });

    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <Stack gap="md">
                            <Group justify="space-between" align="center" wrap="wrap" gap="xs">
                                <Button
                                    component="a"
                                    href="/blog/"
                                    variant="subtle"
                                    color="gray"
                                    size="xs"
                                    leftSection={<IconArrowLeft size={14} stroke={1.8} />}
                                >
                                    Volver a Bitácora
                                </Button>
                                <Text component="time" dateTime={post.date} size="xs" c="gray.4" ff="monospace">
                                    {formattedDate}
                                </Text>
                            </Group>

                            <SectionHeader
                                title={post.title}
                                eyebrow={`BITÁCORA // ${(post.kind ?? "registro").toUpperCase()}`}
                                description={post.description}
                            />

                            <Group gap={6} wrap="wrap">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="light" color="brand" radius="sm" size="sm">
                                        #{tag}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    </div>
                </section>

                <section
                    className="connected-target page-content-target circuit-module circuit-module-content"
                    data-connection-target="contenido"
                    aria-label="Lectura de bitácora"
                >
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <Stack gap="xl">
                            {post.signals && post.signals.length > 0 && (
                                <Paper p="md" radius="sm" withBorder className="content-card">
                                    <Stack gap="xs">
                                        <Group gap="xs">
                                            <IconSparkles size={16} stroke={1.8} color="var(--site-accent)" />
                                            <Text size="xs" fw={700} tt="uppercase" c="gray.1" ff="monospace">
                                                Señales clave de esta entrada
                                            </Text>
                                        </Group>
                                        {post.signals.map((signal, index) => (
                                            <Group key={signal} align="flex-start" wrap="nowrap" gap="xs">
                                                <Text size="xs" fw={700} c="brand.5" ff="monospace" mt={2}>
                                                    0{index + 1}
                                                </Text>
                                                <Text size="sm" c="gray.2" lh={1.65}>
                                                    {signal}
                                                </Text>
                                            </Group>
                                        ))}
                                    </Stack>
                                </Paper>
                            )}

                            <Box className="markdown-body">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </Box>

                            {(post.relatedProjects?.length || post.relatedGadgets?.length) && (
                                <Paper p="md" radius="sm" withBorder className="content-card">
                                    <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                                        <Text size="xs" fw={700} tt="uppercase" c="gray.3" ff="monospace">
                                            Conexiones de este registro en el laboratorio
                                        </Text>
                                        <Group gap="xs" wrap="wrap">
                                            {post.relatedProjects && post.relatedProjects.length > 0 && (
                                                <Button
                                                    component="a"
                                                    href="/projects/"
                                                    size="xs"
                                                    variant="default"
                                                    leftSection={<IconCpu size={14} stroke={1.8} />}
                                                >
                                                    Inspeccionar en Proyectos
                                                </Button>
                                            )}
                                            {post.relatedGadgets && post.relatedGadgets.length > 0 && (
                                                <Button
                                                    component="a"
                                                    href="/setup/"
                                                    size="xs"
                                                    variant="default"
                                                    leftSection={<IconTool size={14} stroke={1.8} />}
                                                >
                                                    Ver fichas en Gadgets
                                                </Button>
                                            )}
                                        </Group>
                                    </Group>
                                </Paper>
                            )}
                        </Stack>
                    </div>
                </section>
            </PcbCircuit>
        </Container>
    );
}
