import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "Blog",
    "Ideas y explicaciones accesibles sobre tecnología y el uso de agentes en software y hardware.",
    "/blog/",
);

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className="page-shell">
            <div className="page-composition circuit-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <SectionHeader
                            title="Blog"
                            eyebrow="IDEAS Y EXPLICACIONES"
                            description="Tecnología explicada de forma accesible y el uso de agentes en software y hardware."
                        />
                    </div>
                </section>

                <section className="connected-target page-content-target circuit-module circuit-module-content" data-connection-target="contenido" aria-label="Contenido del blog">
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        {posts.length > 0 ? (
                            <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="lg">
                                {posts.map((post) => (
                                    <PostCard key={post.slug} post={post} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Paper component="section" aria-label="Estado del blog" className="empty-state">
                                <Stack gap="xs">
                                    <Text className="section-kicker">BLOG / ARCHIVO</Text>
                                    <Text className="empty-state-title">Contenido en preparación</Text>
                                    <Text className="empty-state-description">
                                        Aquí encontrarás ideas sobre tecnología y el uso de agentes en software y hardware.
                                    </Text>
                                </Stack>
                            </Paper>
                        )}
                    </div>
                </section>
            </div>
        </Container>
    );
}
