import { Box, Group, Anchor } from "@mantine/core";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Proyectos", href: "/projects" },
    { name: "Gadgets", href: "/setup" },
    { name: "About me", href: "/about" },
];

export function Navbar() {
    return (
        <Box component="header" className="site-nav">
            <Container>
                <Group h={72} justify="space-between" wrap="nowrap">
                    <Logo />

                    <Group component="nav" aria-label="Navegación principal" visibleFrom="md" className="nav-links">
                        {navItems.map((item) => (
                            <Anchor
                                key={item.href}
                                href={item.href}
                                className="nav-link"
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
