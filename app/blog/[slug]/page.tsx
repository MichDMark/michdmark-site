import { Container } from "@/components/Container";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { es } from "date-fns/locale";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Mich`,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <Container className="py-24 max-w-3xl">
            <div className="mb-10 text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="bg-white/5 px-2 py-1 rounded text-xs font-mono text-brand-red">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">{post.title}</h1>
                <time className="text-zinc-500 font-mono capitalize">
                    {format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es })}
                </time>
            </div>

            <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-zinc-300 prose-a:text-brand-red hover:prose-a:text-red-400">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
        </Container>
    );
}
