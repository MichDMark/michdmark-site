import { Paper, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { GadgetsRack } from "@/components/GadgetsRack";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { PcbCircuit } from "@/components/PcbCircuit";
import { gadgets } from "@/data/gadgets";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "Gadgets",
    "Mesa de taller y fichas técnicas (Datasheets) de las herramientas de software y hardware de Mich DMark.",
    "/setup/",
);

export default function SetupPage() {
    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails />
                    <div className="circuit-content">
                        <SectionHeader
                            title="Gadgets"
                            eyebrow="MESA DE TALLER // DATASHEETS"
                            description="Fichas operativas de mi equipo de software y hardware: especificaciones, límites reales y recetas de configuración visibles para consulta rápida."
                        />
                    </div>
                </section>
                <section className="connected-target page-content-target circuit-module circuit-module-content" data-connection-target="contenido" aria-label="Contenido de gadgets">
                    <CircuitDetails />
                    <div className="circuit-content">
                        {gadgets.length > 0 ? (
                            <GadgetsRack categories={gadgets} />
                        ) : (
                            <Paper component="section" aria-label="Estado de gadgets" className="empty-state">
                                <Stack gap="xs">
                                    <Text className="section-kicker">GADGETS / ARCHIVO</Text>
                                    <Text className="empty-state-title">Contenido en preparación</Text>
                                    <Text className="empty-state-description">
                                        Aquí compartiré gadgets y herramientas, y el papel que tienen en mi trabajo.
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
