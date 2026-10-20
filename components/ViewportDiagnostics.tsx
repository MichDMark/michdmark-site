"use client";

import { useEffect, useState } from "react";
import { Button, Group, Paper, Portal, Stack, Text, Textarea, Title } from "@mantine/core";

function countResolvedGridColumns(template: string) {
    const tracks: string[] = [];
    let track = "";
    let parentheses = 0;
    let brackets = 0;

    for (const character of template.trim()) {
        if (character === "(" && brackets === 0) parentheses += 1;
        if (character === ")" && brackets === 0) parentheses -= 1;
        if (character === "[" && parentheses === 0) brackets += 1;
        if (character === "]" && parentheses === 0) brackets -= 1;

        if (/\s/.test(character) && parentheses === 0 && brackets === 0) {
            if (track) tracks.push(track);
            track = "";
        } else {
            track += character;
        }
    }

    if (track) tracks.push(track);
    return tracks.filter((value) => value && !(value.startsWith("[") && value.endsWith("]"))).length;
}

function readViewportReport() {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".home-destination-row"));
    const styleSheets = Array.from(document.styleSheets)
        .map((sheet) => sheet.href)
        .filter((href): href is string => {
            if (!href) return false;
            try {
                return new URL(href, window.location.href).origin === window.location.origin;
            } catch {
                return false;
            }
        });
    const visualViewport = window.visualViewport;
    const viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content ?? "no encontrado";
    const media800 = window.matchMedia("(max-width: 800px)").matches;
    const media840 = window.matchMedia("(max-width: 840px)").matches;
    const rowReports = rows.map((row, index) => {
        const name = row.dataset.connectionRow || `fila ${index + 1}`;
        const count = row.querySelectorAll(":scope > [data-connection-target]").length;
        const columns = window.getComputedStyle(row).gridTemplateColumns;
        return `- ${name}: columnas=${countResolvedGridColumns(columns)}; cuadros DOM=${count}; gridTemplateColumns="${columns}"`;
    });

    return [
        `Ruta: ${window.location.pathname}`,
        `User-Agent: ${navigator.userAgent}`,
        `Ancho interior (innerWidth): ${window.innerWidth}px; clientWidth: ${document.documentElement.clientWidth}px`,
        `Pantalla: ${window.screen.width} × ${window.screen.height}px; devicePixelRatio: ${window.devicePixelRatio}`,
        `visualViewport: ${visualViewport ? `${visualViewport.width.toFixed(1)} × ${visualViewport.height.toFixed(1)}px; scale=${visualViewport.scale}` : "no disponible"}`,
        `Meta viewport: ${viewportMeta}`,
        `matchMedia max-width 800px: ${media800}; max-width 840px: ${media840}`,
        "Filas de destinos:",
        ...(rowReports.length ? rowReports : ["- no encontradas"]),
        `Ancho de scroll del documento: ${Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)}px`,
        `Hojas CSS propias: ${styleSheets.length ? styleSheets.join(" | ") : "ninguna detectada"}`,
    ].join("\n");
}

export function ViewportDiagnostics() {
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState("");
    const [copyMessage, setCopyMessage] = useState("");

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("diagnostico") !== "1") return;
        const frame = window.requestAnimationFrame(() => setOpen(true));
        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!open) return;

        let frame: number | null = null;
        const refresh = () => {
            setReport(readViewportReport());
            setCopyMessage("");
        };
        const scheduleRefresh = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                refresh();
            });
        };

        refresh();
        window.addEventListener("resize", scheduleRefresh);
        window.addEventListener("orientationchange", scheduleRefresh);
        window.visualViewport?.addEventListener("resize", scheduleRefresh);

        return () => {
            window.removeEventListener("resize", scheduleRefresh);
            window.removeEventListener("orientationchange", scheduleRefresh);
            window.visualViewport?.removeEventListener("resize", scheduleRefresh);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [open]);

    const copyReport = async () => {
        try {
            if (!navigator.clipboard?.writeText) throw new Error("Clipboard no disponible");
            await navigator.clipboard.writeText(report);
            setCopyMessage("Reporte copiado al portapapeles.");
        } catch {
            setCopyMessage("No se pudo copiar automáticamente. El reporte sigue disponible: selecciónalo y cópialo manualmente.");
        }
    };

    if (!open) return null;

    return (
        <Portal target="body">
            <Paper
                component="section"
                aria-label="Diagnóstico de pantalla"
                shadow="xl"
                radius="md"
                p="sm"
                withBorder
                style={{
                    position: "fixed",
                    zIndex: 10000,
                    right: 8,
                    bottom: 8,
                    width: "min(560px, calc(100vw - 16px))",
                    maxHeight: "min(78vh, 720px)",
                    overflowY: "auto",
                    background: "#11151b",
                    borderColor: "#55616d",
                }}
            >
                <Stack gap="xs">
                    <Group justify="space-between" align="center" gap="xs">
                        <Title order={2} size="h4">Diagnóstico de pantalla</Title>
                        <Button size="md" variant="subtle" style={{ minHeight: 44 }} onClick={() => setOpen(false)} aria-label="Cerrar diagnóstico">
                            Cerrar
                        </Button>
                    </Group>
                    <Textarea
                        label="Reporte (seleccionable)"
                        value={report}
                        readOnly
                        minRows={9}
                        maxRows={14}
                        autosize
                        styles={{ input: { fontFamily: "monospace", fontSize: 16, lineHeight: 1.45 } }}
                    />
                    <Group gap="xs" wrap="wrap">
                        <Button style={{ minHeight: 44 }} onClick={copyReport}>Copiar reporte</Button>
                        <Button style={{ minHeight: 44 }} variant="default" onClick={() => {
                            setReport(readViewportReport());
                            setCopyMessage("");
                        }}>Actualizar</Button>
                    </Group>
                    <Text size="xs" role="status" aria-live="polite">{copyMessage}</Text>
                </Stack>
            </Paper>
        </Portal>
    );
}
