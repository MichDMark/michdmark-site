import { Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { ConnectionNetwork } from "@/components/ConnectionNetwork";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { SocialLinks } from "@/components/SocialLinks";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "About me",
    "Conoce el enfoque de Mich DMark en tecnología accesible y el uso de agentes en software y hardware.",
    "/about/",
);

export default function AboutPage() {
    return (
        <Container className="page-shell page-shell-narrow">
            <ConnectionNetwork className="page-composition circuit-composition about-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails />
                    <div className="circuit-content">
                        <SectionHeader title="About me" eyebrow="PRESENTACIÓN" mb={0} connectionSource />
                        <Text className="about-copy">
                            Me interesa la tecnología accesible y el uso de agentes en software y hardware.
                        </Text>
                    </div>
                </section>
                <div className="connected-destinations about-destinations">
                    <section className="connected-target page-target circuit-module" data-connection-target="redes" aria-labelledby="about-social-title">
                        <CircuitDetails />
                        <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                        <div className="circuit-content">
                            <Text id="about-social-title" component="h2" className="home-target-kicker">REDES</Text>
                            <SocialLinks group="social" />
                        </div>
                    </section>
                    <section className="connected-target page-target circuit-module" data-connection-target="contacto" aria-labelledby="about-contact-title">
                        <CircuitDetails />
                        <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                        <div className="circuit-content">
                            <Text id="about-contact-title" component="h2" className="home-target-kicker">CONTACTO</Text>
                            <SocialLinks group="contact" />
                        </div>
                    </section>
                </div>
            </ConnectionNetwork>
        </Container>
    );
}
