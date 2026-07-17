import { Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { gadgets } from "@/data/gadgets";

export const metadata = {
    title: "Mis Gadgets | Mich",
    description: "El equipo y software que uso en mi día a día.",
    alternates: {
        canonical: "/setup/",
    },
};

export default function SetupPage() {
    return (
        <Container py={{ base: "xl", md: 96 }}>
            <SectionHeader
                title="Mis Gadgets"
                description="Las herramientas que uso en mi día a día y los que uso para trabajar."
                mb="xl"
            />
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
        </Container>
    );
}
