import { Paper, Stack, Text } from "@mantine/core";
import { BitacoraExplorer } from "@/components/BitacoraExplorer";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { PcbCircuit } from "@/components/PcbCircuit";
import { getAllPosts } from "@/lib/posts";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "Bitácora",
    "Cuaderno de laboratorio con experimentos, señales clave y explicaciones accesibles sobre tecnología y agentes en software y hardware.",
    "/blog/",
);

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <SectionHeader
                            title="Bitácora"
                            eyebrow="CUADERNO DE LABORATORIO // SEÑALES"
                            description="Notas de experimento, decisiones técnicas y explicaciones accesibles sobre agentes en software y hardware."
                        />
                    </div>
                </section>

                <section className="connected-target page-content-target circuit-module circuit-module-content" data-connection-target="contenido" aria-label="Contenido de la bitácora">
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        {posts.length > 0 ? (
                            <BitacoraExplorer posts={posts} />
                        ) : (
                            <Paper component="section" aria-label="Estado de la bitácora" className="empty-state">
                                <Stack gap="xs">
                                    <Text className="section-kicker">BITÁCORA / ARCHIVO</Text>
                                    <Text className="empty-state-title">Contenido en preparación</Text>
                                    <Text className="empty-state-description">
                                        Aquí encontrarás registros de laboratorio e ideas sobre tecnología y el uso de agentes en software y hardware.
                                    </Text>
                                </Stack>
                            </Paper>
                        )}
                    </div>
                </section>
            </PcbCircuit>
        </Container>
    );
}
