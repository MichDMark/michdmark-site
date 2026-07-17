"use client";

import { Anchor, Text } from "@mantine/core";

interface LogoProps {
    ml?: number | string;
}

export function Logo({ ml }: LogoProps) {
    return (
        <Anchor
            href="/"
            aria-label="Ir al inicio"
            title="Ir al inicio"
            underline="never"
            c="white"
            px="sm"
            py={6}
            ml={ml}
            style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--mantine-radius-md)",
                background: "rgba(255,255,255,0.05)",
                boxShadow: "0 10px 30px -22px rgba(0,0,0,0.6)",
            }}
        >
            <Text component="span" fw={700} ff="var(--mantine-font-family-headings)" size="lg">
                Mich <Text component="span" c="gray.4" inherit>DMark</Text>
            </Text>
        </Anchor>
    );
}
