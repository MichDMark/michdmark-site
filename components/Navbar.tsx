"use client";

import { Box, Group, Anchor } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
    { name: "Blog", href: "/blog/" },
    { name: "Projects", href: "/projects/" },
    { name: "Gadgets", href: "/setup/" },
    { name: "About me", href: "/about/" },
];

export function Navbar() {
    const pathname = usePathname();
    const currentPath = pathname.replace(/\/+$/, "") || "/";

    return (
        <Box component="header" className="site-nav">
            <Container>
                <Group h={72} justify="space-between" wrap="nowrap" className="header-bar">
                    <Logo />

                    <Group component="nav" aria-label="Navegación principal" visibleFrom="md" className="nav-links">
                        {navItems.map((item) => (
                            <Anchor
                                key={item.href}
                                component={Link}
                                href={item.href}
                                aria-current={currentPath === item.href.replace(/\/+$/, "") ? "page" : undefined}
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
