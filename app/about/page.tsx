import { Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { PcbCircuit } from "@/components/PcbCircuit";
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
            <PcbCircuit className="page-composition circuit-composition about-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails />
                    <div className="circuit-content">
                        <SectionHeader title="About me" eyebrow="PRESENTACIÓN" mb={0} />
                        <Text className="about-copy">
                            Me interesa la tecnología accesible y el uso de agentes en software y hardware.
                        </Text>
                    </div>
                </section>
                <div className="connected-destinations about-destinations">
                    <section className="connected-target page-target circuit-module" data-connection-target="redes" aria-labelledby="about-social-title">
                        <CircuitDetails />
                        <div className="circuit-content">
                            <Text id="about-social-title" component="h2" className="home-target-kicker">SOCIAL</Text>
                            <SocialLinks group="social" />
                        </div>
                    </section>
                    <section className="connected-target page-target circuit-module" data-connection-target="contacto" aria-labelledby="about-contact-title">
                        <CircuitDetails />
                        <div className="circuit-content">
                            <Text id="about-contact-title" component="h2" className="home-target-kicker">CONTACT</Text>
                            <SocialLinks group="contact" />
                        </div>
                    </section>
                </div>
            </PcbCircuit>
        </Container>
    );
}
