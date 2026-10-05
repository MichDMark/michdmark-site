import { Box, Stack, Text } from "@mantine/core";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
    return (
        <Box component="footer" className="site-footer">
            <Container>
                <div className="footer-inner">
                    <Stack gap={4}>
                        <Text className="footer-copy">© {new Date().getFullYear()} Mich DMark</Text>
                        <Text className="footer-copy">Tecnología accesible, software, IA y hardware.</Text>
                    </Stack>
                    <Box component="nav" aria-label="Contacto" className="footer-links">
                        <SocialLinks group="contact" />
                    </Box>
                </div>
            </Container>
        </Box>
    );
}
