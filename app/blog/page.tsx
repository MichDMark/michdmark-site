import { Divider, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
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
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Blog"
                description="Un espacio para explicar tecnología de forma accesible y compartir ideas sobre IA aplicada a software y hardware."
                mb="xl"
            />

            <Divider mb="xl" color="rgba(255,255,255,0.1)" />

            {posts.length > 0 ? (
                <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="lg">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </SimpleGrid>
            ) : (
                <Paper p="xl" radius="lg" withBorder style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                    <Stack gap="xs">
                        <Text fw={600} c="white">Contenido en preparación</Text>
                        <Text c="gray.4">Aquí encontrarás explicaciones accesibles sobre tecnología e IA aplicada a software y hardware.</Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
