import { Divider, SimpleGrid } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Artículos | Mich",
    description: "Artículos sobre desarrollo web, diseño, tecnología y productividad.",
    alternates: {
        canonical: "/blog/",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Artículos"
                description="Reflexiones sobre desarrollo web, diseño y tecnología."
                mb="xl"
            />

            <Divider mb="xl" color="rgba(255,255,255,0.1)" />

            <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="lg">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </SimpleGrid>
        </Container>
    );
}
