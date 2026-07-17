import { Box, Group, Anchor } from "@mantine/core";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Proyectos", href: "/projects" },
    { name: "Mis Gadgets", href: "/setup" },
    { name: "Sobre Mi", href: "/about" },
];

export function Navbar() {
    return (
        <Box
            component="header"
            pos="sticky"
            top={0}
            style={{
                zIndex: 50,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(11,15,20,0.82)",
                backdropFilter: "blur(12px)",
            }}
        >
            <Container>
                <Group h={64} justify="space-between">
                    <Logo />

                    <Group component="nav" visibleFrom="md" gap="lg">
                        {navItems.map((item) => (
                            <Anchor
                                key={item.href}
                                href={item.href}
                                c="gray.5"
                                fw={500}
                                size="sm"
                                underline="never"
                            >
                                {item.name}
                            </Anchor>
                        ))}
                    </Group>

                    <MobileMenu items={navItems} />
                </Group>
            </Container>
        </Box>
    );
}
