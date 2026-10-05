import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Blog",
    description: "Ideas y explicaciones accesibles sobre IA aplicada a software y hardware.",
    alternates: {
        canonical: "/blog/",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className="page-shell">
            <SectionHeader
                title="Blog"
                eyebrow="IDEAS Y EXPLICACIONES"
                description="Tecnología explicada de forma accesible e inteligencia artificial aplicada a software y hardware."
            />

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
                            Aquí encontrarás explicaciones accesibles sobre tecnología e IA aplicada a software y hardware.
                        </Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
