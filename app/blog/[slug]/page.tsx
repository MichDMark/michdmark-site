import { Badge, Box, Group, Stack, Text, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { es } from "date-fns/locale";
import { absoluteUrl, siteConfig } from "@/lib/site";

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
        alternates: {
            canonical: `/blog/${post.slug}/`,
        },
        openGraph: {
            type: "article",
            locale: siteConfig.locale,
            url: absoluteUrl(`/blog/${post.slug}/`),
            siteName: siteConfig.name,
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            authors: [siteConfig.author],
            tags: post.tags,
        },
        twitter: {
            card: "summary",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <Container py={{ base: "xl", md: 96 }} size="md">
            <Stack gap="xl">
                <Stack gap="md" ta="center" align="center">
                    <Group gap={6} justify="center">
                    {post.tags.map((tag) => (
                        <Badge key={tag} color="brand" variant="light">
                            {tag}
                        </Badge>
                    ))}
                    </Group>
                    <Title order={1} c="white" size="clamp(2rem, 5vw, 3.25rem)">
                        {post.title}
                    </Title>
                    <Text component="time" dateTime={post.date} c="dimmed" tt="capitalize">
                    {format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </Text>
                </Stack>

                <Box className="markdown-body">
                    <article>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </article>
                </Box>
            </Stack>
        </Container>
    );
}
