import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import Link from "next/link";
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
    const relatedItems = [
        ...(post.relatedProjects ?? []).map((id) => ({ id, href: `/projects/#${id}` })),
        ...(post.relatedGadgets ?? []).map((id) => ({ id, href: `/setup/#${id}` })),
    ];

    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section
                    className="connected-target page-content-target circuit-module circuit-module-content"
                    data-connection-target="contenido"
                    aria-label="Lectura de Bitácora"
                >
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <article>
                            <Stack gap="xl">
                                <header>
                                    <Group justify="space-between" align="center" wrap="wrap" gap="xs" mb="md">
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
                                        <Text component="time" dateTime={post.date} size="sm" c="gray.4">
                                            {formattedDate}
                                        </Text>
                                    </Group>

                                    <SectionHeader
                                        title={post.title}
                                        eyebrow="BITÁCORA"
                                        description={post.description}
                                    />

                                    <Group gap={6} wrap="wrap" mt="md">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="light" color="brand" radius="sm" size="sm">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </Group>
                                </header>

                                <div className="markdown-body">
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>

                                {relatedItems.length > 0 && (
                                    <aside aria-label="Referencias relacionadas">
                                        <Text component="span" size="sm" c="dimmed">Relacionado: </Text>
                                        {relatedItems.map((item, index) => (
                                            <span key={item.href}>
                                                {index > 0 ? ", " : ""}
                                                <Link href={item.href}>{item.id}</Link>
                                            </span>
                                        ))}
                                    </aside>
                                )}
                            </Stack>
                        </article>
                    </div>
                </section>
            </PcbCircuit>
        </Container>
    );
}
