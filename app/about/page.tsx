import { Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { ConnectionNetwork } from "@/components/ConnectionNetwork";
import { SectionHeader } from "@/components/SectionHeader";
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
            <ConnectionNetwork className="page-composition about-composition">
                <section className="connected-origin page-origin">
                    <SectionHeader title="About me" eyebrow="PRESENTACIÓN" mb={0} connectionSource />
                    <Text className="about-copy">
                        Me interesa la tecnología accesible y el uso de agentes en software y hardware.
                    </Text>
                </section>
                <div className="connected-destinations about-destinations">
                    <section className="connected-target page-target" data-connection-target="redes" aria-labelledby="about-social-title">
                        <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                        <Text id="about-social-title" component="h2" className="home-target-kicker">REDES</Text>
                        <SocialLinks group="social" />
                    </section>
                    <section className="connected-target page-target" data-connection-target="contacto" aria-labelledby="about-contact-title">
                        <span className="connection-target-port" data-connection-target-port aria-hidden="true" />
                        <Text id="about-contact-title" component="h2" className="home-target-kicker">CONTACTO</Text>
                        <SocialLinks group="contact" />
                    </section>
                </div>
            </ConnectionNetwork>
        </Container>
    );
}
