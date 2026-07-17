import { Box, Group, Text } from "@mantine/core";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
    return (
        <Box component="footer" py="xl" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.35)" }}>
            <Container>
                <Group justify="space-between" gap="lg">
                    <Text size="sm" c="gray.5">
                        © {new Date().getFullYear()} Mich. Todos los derechos reservados.
                    </Text>
                    <SocialLinks />
                </Group>
            </Container>
        </Box>
    );
}
