import { Paper, Stack, Text } from "@mantine/core";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CircuitDetails } from "@/components/CircuitDetails";
import { PcbCircuit } from "@/components/PcbCircuit";
import { ProjectWorkbench } from "@/components/ProjectWorkbench";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
    "Proyectos",
    "Banco de pruebas de software y hardware de Mich DMark: arquitectura por bloques, simulador de señales y evolución de prototipos.",
    "/projects/",
);

export default function ProjectsPage() {
    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section className="connected-origin page-origin circuit-module circuit-module-origin">
                    <CircuitDetails />
                    <div className="circuit-content">
                        <SectionHeader
                            title="Proyectos"
                            eyebrow="BANCO DE PRUEBAS // WORKBENCH"
                            description="Sistemas desarmados por capas: explora sus bloques físicos y lógicos, ejecuta escenarios de señal y revisa qué falló antes de llegar a la versión actual."
                        />
                    </div>
                </section>
                <section className="connected-target page-content-target circuit-module circuit-module-content" data-connection-target="contenido" aria-label="Contenido de proyectos">
                    <CircuitDetails />
                    <div className="circuit-content">
                        {projects.length > 0 ? (
                            <ProjectWorkbench projects={projects} />
                        ) : (
                            <Paper component="section" aria-label="Estado de proyectos" className="empty-state">
                                <Stack gap="xs">
                                    <Text className="section-kicker">PROYECTOS / ARCHIVO</Text>
                                    <Text className="empty-state-title">Contenido en preparación</Text>
                                    <Text className="empty-state-description">
                                        Aquí compartiré proyectos de software y hardware, junto con el proceso para hacerlos.
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
