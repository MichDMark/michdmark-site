import { Anchor, Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { DisciplineMap } from "@/components/DisciplineMap";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
    return (
        <Box component="section" className="home-hero" aria-labelledby="home-title">
            <Container>
                <div className="home-layout">
                    <Stack className="home-copy" gap="xl">
                        <Text className="eyebrow">Tecnología accesible</Text>
                        <Title id="home-title" order={1} className="home-title">
                            Mich <span>DMark</span>
                        </Title>
                        <Text className="home-lede">
                            Tecnología e inteligencia artificial aplicada a software y hardware.
                        </Text>

                        <Group className="home-actions">
                            <Button component="a" href="/blog" className="home-action home-action-primary">
                                Explorar el blog
                            </Button>
                            <Button component="a" href="/about" className="home-action home-action-secondary">
                                About me
                            </Button>
                        </Group>

                        <nav className="home-links" aria-label="Secciones del sitio">
                            <Anchor className="text-link" href="/projects">Proyectos</Anchor>
                            <Anchor className="text-link" href="/setup">Gadgets</Anchor>
                        </nav>

                        <section className="home-social" aria-label="Redes y contacto">
                            <div>
                                <Text component="h2" className="link-group-title">Redes</Text>
                                <SocialLinks group="social" />
                            </div>
                            <div>
                                <Text component="h2" className="link-group-title">Contacto</Text>
                                <SocialLinks group="contact" />
                            </div>
                        </section>
                    </Stack>
                    <DisciplineMap />
                </div>
            </Container>
        </Box>
    );
}
