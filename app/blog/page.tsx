import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Blog | Mich",
    description: "Writing about web development, design, and gear.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className="py-24">
            <SectionHeader
                title="Blog"
                description="Thoughts on software engineering, design, and gadgetry."
                className="mb-12"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </Container>
    );
}
