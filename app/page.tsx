import { Box, Button, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <Box py={{ base: 40, sm: 56 }}>
      <Container>
        <Stack maw={760} gap="xl">
          <Title order={1} c="white" size="clamp(2.5rem, 7vw, 4rem)" lh={1.05}>
            Desarrollador.{" "}
            <Text component="span" inherit c="brand.6">
              Creador de Contenido.
            </Text>
            <br />
            Maker.
          </Title>

          <Paper
            p={{ base: "lg", sm: "xl" }}
            radius="xl"
            withBorder
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              background: "linear-gradient(180deg, rgba(225,29,72,0.22), rgba(0,0,0,0.6))",
              backdropFilter: "blur(10px)",
            }}
          >
            <Stack gap="md">
              <Text size="xl" c="white" lh={1.65}>
                Soy Mich, bienvenido a mi espacio. Funciono mejor después de un par de tazas de café.
              </Text>

              <Text size="xl" c="gray.3" lh={1.65}>
                Aquí encontrarás mi blog, proyectos y los gadgets que uso en mi día a día.
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            withBorder
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Paper p="md" radius="md" withBorder style={{ background: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.12)" }}>
                <Stack gap="md">
                  <Group gap="xs">
                    <ThemeIcon size={8} radius="xl" color="brand" />
                    <Text fw={600} c="white">
                    Links a mis redes
                    </Text>
                  </Group>
                  <SocialLinks group="social" />
                </Stack>
              </Paper>

              <Paper p="md" radius="md" withBorder style={{ background: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.12)" }}>
                <Stack gap="md">
                  <Group gap="xs">
                    <ThemeIcon size={8} radius="xl" color="brand" />
                    <Text fw={600} c="white">
                    Contáctame
                    </Text>
                  </Group>
                  <SocialLinks group="contact" />
                </Stack>
              </Paper>
            </SimpleGrid>
          </Paper>

          <Group gap="sm">
            <Button
              component="a"
                href="/blog"
              size="md"
              radius="md"
              color="brand"
              >
                Leer el blog
            </Button>

            <Button
              component="a"
                href="/setup"
              size="md"
              radius="md"
              variant="outline"
              color="brand"
              >
                Mis Gadgets
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
