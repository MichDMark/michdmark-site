import { Box, Group, Stack, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
    title: "Sobre mí | Mich",
    description: "Más sobre Mich.",
    alternates: {
        canonical: "/about/",
    },
};

export default function AboutPage() {
    return (
        <Container py={{ base: "xl", md: 96 }} size="sm">
            <Group align="flex-start" gap="xl">
                <AvatarPlaceholder />
                <Stack gap="md" flex={1}>
                    <SectionHeader title="Sobre mí" mb="sm" />
                    <Box className="markdown-body">
                        <div>
                        <p>
                            Soy Mich, Ingeniero Electrónico con Maestría en Mecatrónica, pero de alguna manera la vida me ha llevado a muchos caminos diferentes que hoy comparto en este sitio.
                        </p>
                        <p>
                            Me dedico al desarrollo de software, la creación de contenido, amante de un buen café de especialidad y en mis ratos libres jugar TCG y escuchar Podcasts.
                        </p>
                        <p>
                            &ldquo;No sé a dónde nos lleva este camino, pero definitivamente es un lugar diferente.&rdquo;
                        </p>
                        </div>
                    </Box>
                    <Stack gap="sm" mt="lg">
                        <Title order={3} size="h6" c="white" tt="uppercase">Contacto</Title>
                        <SocialLinks />
                    </Stack>
                </Stack>
            </Group>
        </Container>
    );
}
