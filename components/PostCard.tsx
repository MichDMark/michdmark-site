import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Post } from "@/lib/posts";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const formattedDate = format(parseISO(post.date), "d MMM yyyy", { locale: es }); // ej: 20 mar 2024

    return (
        <Card
            component="a"
            href={`/blog/${post.slug}`}
            padding="lg"
            radius="lg"
            withBorder
            style={{
                minHeight: "100%",
                background: "rgba(17,24,39,0.7)",
                borderColor: "rgba(255,255,255,0.08)",
                textDecoration: "none",
            }}
        >
            <Stack gap="md" h="100%">
                <Group justify="space-between" align="flex-start" gap="md">
                    <Group gap={6}>
                    {post.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="light"
                            color="brand"
                            radius="xl"
                            size="sm"
                        >
                            #{tag}
                        </Badge>
                    ))}
                    </Group>

                    <Text component="time" dateTime={post.date} c="dimmed" size="xs" tt="capitalize">
                        {formattedDate}
                    </Text>
                </Group>

                <Title order={3} size="h3" c="gray.0">
                    {post.title}
                </Title>

                <Text c="gray.5" size="sm" lineClamp={2} lh={1.7}>
                    {post.description}
                </Text>

                <Text mt="auto" pt="sm" c="gray.2" size="xs" fw={700} tt="uppercase">
                    Leer artículo <IconArrowRight size={14} stroke={2} style={{ verticalAlign: "middle" }} />
                </Text>
            </Stack>
        </Card>
    );
}
