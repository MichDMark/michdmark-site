import { Stack, Text } from "@mantine/core";
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
        <Container className="page-shell page-shell-narrow">
            <Stack gap="xl">
                <SectionHeader title="About me" eyebrow="PRESENTACIÓN" mb={0} />
                <Text className="about-copy">
                    Me interesa la tecnología accesible y la inteligencia artificial aplicada a software y hardware.
                </Text>
                <section className="about-links" aria-labelledby="about-links-title">
                    <Text id="about-links-title" component="h2" className="section-kicker" mb="sm">
                        Redes y contacto
                    </Text>
                    <SocialLinks />
                </section>
            </Stack>
        </Container>
    );
}
