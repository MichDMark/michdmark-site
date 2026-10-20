import { Box, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { ConnectionNetwork } from "@/components/ConnectionNetwork";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
    return (
        <Box component="section" className="home-hero" aria-labelledby="home-title">
            <Container>
                <Stack className="home-flow" gap="xl">
                    <ConnectionNetwork className="home-composition">
                        <section className="connected-origin home-origin">
                            <Text className="eyebrow">Tecnología accesible</Text>
                            <div className="home-title-source">
                                <Title id="home-title" order={1} className="home-title">
                                    Mich <span>DMark</span>
                                </Title>
                                <span className="connection-origin-port" data-connection-origin-port aria-hidden="true" />
                            </div>
                            <Text className="home-lede">
                                Tecnología y agentes aplicados a software y hardware.
                            </Text>
                        </section>

                        <div className="connected-destinations home-destinations">
                            <section className="connected-target home-target home-about-target" data-connection-target="about" aria-labelledby="home-about-title">
                                <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                <Link href="/about/" className="home-about-link">
                                    <h2 id="home-about-title" className="home-target-title">About me</h2>
                                    <span className="home-target-description">Conoce mi enfoque y encuentra mis redes y contacto.</span>
                                    <span className="home-target-arrow" aria-hidden="true">↗</span>
                                </Link>
                            </section>

                            <section className="connected-target home-target home-link-group" data-connection-target="redes" aria-labelledby="home-social-title">
                                <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                <Text id="home-social-title" component="h2" className="home-target-kicker">REDES</Text>
                                <SocialLinks group="social" />
                            </section>

                            <section className="connected-target home-target home-link-group" data-connection-target="contacto" aria-labelledby="home-contact-title">
                                <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                <Text id="home-contact-title" component="h2" className="home-target-kicker">CONTACTO</Text>
                                <SocialLinks group="contact" />
                            </section>
                        </div>
                    </ConnectionNetwork>
                    <div className="home-next-steps">
                        <Link href="/blog/" className="home-action home-action-primary home-blog-link">
                            Explorar el blog <span aria-hidden="true">↗</span>
                        </Link>
                        <nav className="home-links" aria-label="Más secciones">
                            <Link className="text-link" href="/projects/">Proyectos</Link>
                            <Link className="text-link" href="/setup/">Gadgets</Link>
                        </nav>
                    </div>
                </Stack>
            </Container>
        </Box>
    );
}
