import { Box, Stack, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
    title: "About me",
    description: "Conoce el enfoque de Mich DMark en tecnología accesible e inteligencia artificial aplicada a software y hardware.",
    alternates: {
        canonical: "/about/",
    },
};

export default function AboutPage() {
    return (
        <Container py={{ base: "xl", md: 96 }} size="sm">
            <Stack gap="md">
                <SectionHeader title="About me" mb="sm" />
                <Box className="markdown-body">
                    <div>
                        <p>
                            Soy Mich DMark. Este espacio reúne mi interés por la tecnología accesible y por la inteligencia artificial aplicada al software y al hardware.
                        </p>
                        <p>
                            Aquí compartiré ideas, proyectos y gadgets, además de explicaciones sobre cómo funciona la tecnología y cómo la llevo a la práctica. El sitio y sus contenidos están en construcción.
                        </p>
                    </div>
                </Box>
                <Stack gap="sm" mt="lg">
                    <Title order={3} size="h6" c="white" tt="uppercase">Redes y contacto</Title>
                    <SocialLinks />
                </Stack>
            </Stack>
        </Container>
    );
}
