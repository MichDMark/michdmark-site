import { Box, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { ConnectionNetwork } from "@/components/ConnectionNetwork";
import { Container } from "@/components/Container";
import { CircuitDetails } from "@/components/CircuitDetails";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
    return (
        <Box component="section" className="home-hero" aria-labelledby="home-title">
            <Container>
                <Stack className="home-flow" gap="xl">
                    <ConnectionNetwork className="home-composition home-sequenced-composition circuit-composition" sequence>
                        <section className="connected-origin home-origin circuit-module circuit-module-origin">
                            <CircuitDetails tone="red" />
                            <div className="circuit-content">
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
                            </div>
                        </section>

                        <div className="connected-destinations home-destinations">
                            <div className="home-destination-row home-primary-destinations" data-connection-row="primary">
                                <Link href="/blog/" className="connected-target home-target home-destination home-featured-destination circuit-module circuit-module-red" data-connection-target="blog" aria-labelledby="home-blog-title" data-sequence-index="0">
                                    <CircuitDetails tone="red" />
                                    <span className="connection-target-port" data-connection-target-port data-circuit-port-side="top" aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <span className="home-destination-kicker">IDEAS Y EXPLICACIONES</span>
                                        <span id="home-blog-title" className="home-target-title">Blog</span>
                                        <span className="home-target-description">Tecnología y agentes explicados con claridad.</span>
                                    </div>
                                    <span className="home-destination-arrow" aria-hidden="true">↗</span>
                                </Link>

                                <Link href="/projects/" className="connected-target home-target home-destination home-feature-destination circuit-module" data-connection-target="proyectos" aria-labelledby="home-projects-title" data-sequence-index="1">
                                    <CircuitDetails />
                                    <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <span className="home-destination-kicker">SOFTWARE / HARDWARE</span>
                                        <span id="home-projects-title" className="home-target-title">Proyectos</span>
                                        <span className="home-target-description">Ideas convertidas en proyectos.</span>
                                    </div>
                                    <span className="home-destination-arrow" aria-hidden="true">↗</span>
                                </Link>

                                <Link href="/setup/" className="connected-target home-target home-destination home-feature-destination circuit-module" data-connection-target="gadgets" aria-labelledby="home-gadgets-title" data-sequence-index="2">
                                    <CircuitDetails />
                                    <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <span className="home-destination-kicker">HERRAMIENTAS</span>
                                        <span id="home-gadgets-title" className="home-target-title">Gadgets</span>
                                        <span className="home-target-description">Herramientas que uso en mi trabajo.</span>
                                    </div>
                                    <span className="home-destination-arrow" aria-hidden="true">↗</span>
                                </Link>
                            </div>

                            <div className="home-destination-row home-secondary-destinations" data-connection-row="secondary">
                                <Link href="/about/" className="connected-target home-target home-destination home-secondary-destination circuit-module" data-connection-target="about" aria-labelledby="home-about-title" data-sequence-index="3">
                                    <CircuitDetails />
                                    <span className="connection-target-port" data-connection-target-port data-circuit-port-side="top" aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <span className="home-destination-kicker">PRESENTACIÓN</span>
                                        <span id="home-about-title" className="home-target-title">About me</span>
                                        <span className="home-target-description">Conoce mi enfoque.</span>
                                    </div>
                                    <span className="home-destination-arrow" aria-hidden="true">↗</span>
                                </Link>

                                <section className="connected-target home-target home-link-group home-secondary-destination circuit-module" data-connection-target="redes" aria-labelledby="home-social-title" data-sequence-index="4">
                                    <CircuitDetails />
                                    <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <Text id="home-social-title" component="h2" className="home-target-title">Redes</Text>
                                        <SocialLinks group="social" />
                                    </div>
                                </section>

                                <section className="connected-target home-target home-link-group home-secondary-destination circuit-module" data-connection-target="contacto" aria-labelledby="home-contact-title" data-sequence-index="5">
                                    <CircuitDetails />
                                    <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                                    <span className="connection-output-port" data-connection-output-port aria-hidden="true" />
                                    <div className="circuit-content">
                                        <Text id="home-contact-title" component="h2" className="home-target-title">Contacto</Text>
                                        <SocialLinks group="contact" />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </ConnectionNetwork>
                </Stack>
            </Container>
        </Box>
    );
}
