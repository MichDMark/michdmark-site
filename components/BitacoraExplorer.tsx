"use client";

import { useState } from "react";
import { Anchor, Badge, Button, Group, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import type { Post } from "@/lib/posts";

interface BitacoraExplorerProps {
    posts: Post[];
}

export function BitacoraExplorer({ posts }: BitacoraExplorerProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const availableTags = Array.from(new Set(posts.flatMap((post) => post.tags)));
    const normalizedQuery = query.trim().toLocaleLowerCase("es");

    const filteredPosts = posts.filter((post) => {
        const matchesTag = activeTag === null || post.tags.includes(activeTag);
        const searchableText = [post.title, post.description, ...post.tags].join(" ").toLocaleLowerCase("es");
        return matchesTag && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });

    return (
        <Stack gap="xl">
            <Paper p="md" radius="sm" withBorder className="content-card">
                <Stack gap="sm">
                    <TextInput
                        label="Buscar artículos"
                        placeholder="Título, descripción o etiqueta"
                        leftSection={<IconSearch size={16} />}
                        value={query}
                        onChange={(event) => setQuery(event.currentTarget.value)}
                    />
                    <Group gap="xs" wrap="wrap" role="group" aria-label="Filtrar artículos por etiqueta">
                        <Button size="xs" variant={activeTag === null ? "filled" : "default"} color="brand" onClick={() => setActiveTag(null)}>
                            Todas
                        </Button>
                        {availableTags.map((tag) => (
                            <Button
                                key={tag}
                                size="xs"
                                variant={activeTag === tag ? "filled" : "default"}
                                color="gray"
                                onClick={() => setActiveTag(tag)}
                            >
                                #{tag}
                            </Button>
                        ))}
                    </Group>
                    <Text size="sm" c="dimmed" aria-live="polite">
                        {filteredPosts.length} {filteredPosts.length === 1 ? "artículo" : "artículos"}
                    </Text>
                </Stack>
            </Paper>

            <Stack gap="lg">
                {filteredPosts.map((post) => (
                    <Paper key={post.slug} component="article" p="lg" radius="sm" withBorder className="content-card post-card">
                        <Stack gap="md">
                            <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                                <Group gap="xs" wrap="wrap">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="light" color="brand" radius="sm" size="sm">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </Group>
                                <Text component="time" dateTime={post.date} c="gray.4" size="sm">
                                    {format(parseISO(post.date), "d MMM yyyy", { locale: es })}
                                </Text>
                            </Group>

                            <div>
                                <Title order={2} size="h3" c="gray.0" mb={6}>
                                    <Link href={`/blog/${post.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>
                                        {post.title}
                                    </Link>
                                </Title>
                                <Text c="gray.4" size="sm" lh={1.75}>{post.description}</Text>
                            </div>

                            <Anchor component={Link} href={`/blog/${post.slug}/`} size="sm" fw={600} c="brand.4" w="fit-content">
                                Leer artículo →
                            </Anchor>
                        </Stack>
                    </Paper>
                ))}
                {filteredPosts.length === 0 && <Text c="dimmed">No hay artículos que coincidan con la búsqueda.</Text>}
            </Stack>
        </Stack>
    );
}
