import { Box, Button, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <Box py={{ base: 40, sm: 56 }}>
      <Container>
        <Stack maw={760} gap="xl">
          <Title order={1} c="white" size="clamp(2.5rem, 7vw, 4rem)" lh={1.05}>
            Mich DMark
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
                Exploro cómo acercar la tecnología a más personas, con interés en la inteligencia artificial aplicada al software y al hardware.
              </Text>

              <Text size="xl" c="gray.3" lh={1.65}>
                Este sitio reúne ideas, proyectos y gadgets. El contenido está en construcción y el blog crecerá con nuevas explicaciones y aprendizajes.
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
                    Mis redes
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
              Explorar el blog
            </Button>

            <Button
              component="a"
              href="/setup"
              size="md"
              radius="md"
              variant="outline"
              color="brand"
            >
              Gadgets
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
