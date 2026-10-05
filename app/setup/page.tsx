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
        <Container className="page-shell">
            <SectionHeader
                title="Gadgets"
                eyebrow="HERRAMIENTAS"
                description="Un espacio para conocer las herramientas de software y hardware y cómo las uso."
            />
            {gadgets.length > 0 ? (
                <Stack gap={56}>
                    {gadgets.map((category) => (
                        <Stack key={category.title} gap="lg">
                            <Title order={2} size="h3" c="white" pl="md" style={{ borderLeft: "2px solid var(--site-accent)" }}>
                                {category.title}
                            </Title>
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                                {category.items.map((item) => (
                                    <Card key={item.name} padding="md" radius="sm" withBorder className="content-card">
                                        <Text fw={700} c="gray.0" mb={4}>{item.name}</Text>
                                        <Text size="sm" c="gray.4" lh={1.7}>{item.description}</Text>
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Paper component="section" aria-label="Estado de gadgets" className="empty-state">
                    <Stack gap="xs">
                        <Text className="section-kicker">GADGETS / ARCHIVO</Text>
                        <Text className="empty-state-title">Contenido en preparación</Text>
                        <Text className="empty-state-description">
                            Aquí compartiré gadgets y herramientas, y el papel que tienen en mi trabajo.
                        </Text>
                    </Stack>
                </Paper>
            )}
        </Container>
    );
}
