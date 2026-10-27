# Esquemas y plantillas editoriales

## Blog

```yaml
---
title: "Título"
description: "Descripción breve"
date: "2026-10-27"
tags: ["Etiqueta"]
# Opcionales, solo con identificadores existentes:
relatedProjects: ["id-proyecto"]
relatedGadgets: ["id-gadget"]
---
```

`title`, `description` y `date` son textos obligatorios no vacíos; la fecha debe ser real y tener formato `YYYY-MM-DD`. `tags`, `relatedProjects` y `relatedGadgets` son listas opcionales de textos no vacíos; si se omiten las etiquetas, el parser usa una lista vacía. Omite las relaciones cuando no aporten contexto. El slug es el nombre del archivo `.md` sin extensión; `getPostBySlug` rechaza slugs vacíos, `.`, `..`, rutas absolutas y separadores `/` o `\`. Por convención usa minúsculas, guiones y ningún espacio.

## Ruta estática de artículos

Con `output: "export"`, crea `app/blog/[slug]/page.tsx` cuando haya al menos un post; retírala si la colección queda vacía. La plantilla usa `component="a"` en el botón de regreso para compatibilidad con Server Components y Mantine v9.

```tsx
import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { CircuitDetails } from "@/components/CircuitDetails";
import { Container } from "@/components/Container";
import { PcbCircuit } from "@/components/PcbCircuit";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { createPageMetadata } from "@/lib/site";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return createPageMetadata("Blog", "Entrada no encontrada.", "/blog/");
    }

    return createPageMetadata(post.title, post.description, `/blog/${post.slug}/`);
}

export default async function BlogPostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es });
    const relatedItems = [
        ...(post.relatedProjects ?? []).map((id) => ({ id, href: `/projects/#${id}` })),
        ...(post.relatedGadgets ?? []).map((id) => ({ id, href: `/setup/#${id}` })),
    ];

    return (
        <Container className="page-shell">
            <PcbCircuit className="page-composition circuit-composition">
                <section
                    className="connected-target page-content-target circuit-module circuit-module-content"
                    data-connection-target="contenido"
                    aria-label="Lectura de Blog"
                >
                    <CircuitDetails tone="red" />
                    <div className="circuit-content">
                        <article>
                            <Stack gap="xl">
                                <header>
                                    <Group justify="space-between" align="center" wrap="wrap" gap="xs" mb="md">
                                        <Button
                                            component="a"
                                            href="/blog/"
                                            variant="subtle"
                                            color="gray"
                                            size="xs"
                                            leftSection={<IconArrowLeft size={14} stroke={1.8} />}
                                        >
                                            Volver a Blog
                                        </Button>
                                        <Text component="time" dateTime={post.date} size="sm" c="gray.4">
                                            {formattedDate}
                                        </Text>
                                    </Group>

                                    <SectionHeader
                                        title={post.title}
                                        eyebrow="BLOG"
                                        description={post.description}
                                    />

                                    <Group gap={6} wrap="wrap" mt="md">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="light" color="brand" radius="sm" size="sm">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </Group>
                                </header>

                                <div className="markdown-body">
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>

                                {relatedItems.length > 0 && (
                                    <aside aria-label="Referencias relacionadas">
                                        <Text component="span" size="sm" c="dimmed">Relacionado: </Text>
                                        {relatedItems.map((item, index) => (
                                            <span key={item.href}>
                                                {index > 0 ? ", " : ""}
                                                <Link href={item.href}>{item.id}</Link>
                                            </span>
                                        ))}
                                    </aside>
                                )}
                            </Stack>
                        </article>
                    </div>
                </section>
            </PcbCircuit>
        </Container>
    );
}
```

## Project (`data/projects.ts`)

`domain` indica software, hardware, híbrido o agentes; `status` describe su estado. `metrics` contiene pares etiqueta/valor; `blocks` usa los roles `input`, `core`, `output` o `storage`. `simulation` es opcional y describe escenarios y trazas; `milestones` usa los estados `failed`, `iterated` o `shipped`. Las referencias son opcionales y deben apuntar a elementos existentes.

```ts
export type ProjectDomain = "software" | "hardware" | "hibrido" | "agentes";
export type ProjectStatus = "produccion" | "prototipo" | "experimento" | "archivado";

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectBlock {
    id: string;
    label: string;
    role: "input" | "core" | "output" | "storage";
    tech: string;
    detail: string;
}

export interface ProjectMilestone {
    version: string;
    title: string;
    outcome: string;
    status: "failed" | "iterated" | "shipped";
}

export interface ProjectSimulationScenario {
    id: string;
    inputLabel: string;
    summary: string;
    trace: string[];
    output: string;
}

export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    domain: ProjectDomain;
    status: ProjectStatus;
    stack: string[];
    url: string;
    metrics: ProjectMetric[];
    blocks: ProjectBlock[];
    milestones: ProjectMilestone[];
    simulation?: ProjectSimulationScenario[];
    gadgetIds?: string[];
    relatedPostSlug?: string;
}
```

## Gadget (`data/gadgets.ts`)

Una categoría agrupa fichas. `status` representa uso diario, por proyecto, pruebas o reemplazo; `verdict` expresa su valoración. `specs` son pares etiqueta/valor, `pros` enumera ventajas, y `limit` y `configSnippet` son obligatorios. Usa comandos reales y referencias opcionales válidas.

```ts
export type GadgetStatus = "diario" | "por-proyecto" | "en-pruebas" | "reemplazado";
export type GadgetVerdict = "imprescindible" | "recomendado" | "situacional";

export interface GadgetSpec {
    label: string;
    value: string;
}

export interface GadgetConfigSnippet {
    label: string;
    code: string;
}

export interface Gadget {
    id: string;
    name: string;
    description: string;
    role: string;
    status: GadgetStatus;
    verdict: GadgetVerdict;
    specs: GadgetSpec[];
    pros: string[];
    limit: string;
    configSnippet: GadgetConfigSnippet;
    replaces?: string;
    combosWith?: string[];
    projectIds?: string[];
    relatedPostSlug?: string;
    link?: string;
}

export interface GadgetCategory {
    id: string;
    title: string;
    code: string;
    description: string;
    items: Gadget[];
}
```
