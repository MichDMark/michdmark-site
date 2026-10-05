import { Card, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { gadgets } from "@/data/gadgets";

export const metadata = {
    title: "Gadgets",
    description: "Gadgets y herramientas de software y hardware de Mich DMark.",
    alternates: {
        canonical: "/setup/",
    },
};

export default function SetupPage() {
    return (
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Gadgets"
                description="Un espacio para conocer las herramientas de software y hardware y cómo las uso."
                mb="xl"
            />
            {gadgets.length > 0 ? (
                <Stack gap={56}>
                    {gadgets.map((category) => (
                        <Stack key={category.title} gap="lg">
                            <Title order={3} size="h3" c="white" pl="md" style={{ borderLeft: "2px solid var(--mantine-color-brand-6)" }}>
                                {category.title}
                            </Title>
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                                {category.items.map((item) => (
                                    <Card key={item.name} padding="md" radius="lg" withBorder style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
                                        <Text fw={700} c="gray.0" mb={4}>{item.name}</Text>
                                        <Text size="sm" c="gray.5" lh={1.7}>{item.description}</Text>
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Paper p="xl" radius="lg" withBorder style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                    <Stack gap="xs">
                        <Text fw={600} c="white">Contenido en preparación</Text>
                        <Text c="gray.4">Aquí compartiré gadgets y herramientas, y el papel que tienen en mi trabajo.</Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
