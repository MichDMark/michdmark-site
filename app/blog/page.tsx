import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Artículos | Mich",
    description: "Artículos sobre desarrollo web, diseño, tecnología y productividad.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className="py-16 md:py-24">
            <SectionHeader
                title="Artículos"
                description="Reflexiones sobre desarrollo web, diseño y tecnología."
                className="mb-8 md:mb-12"
            />

            {/* subtle divider */}
            <div className="mb-8 h-px w-full bg-white/10" />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </Container>
    );
}