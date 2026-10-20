"use client";

import { Burger, Button, Drawer, Stack, useMantineTheme } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { name: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const currentPath = pathname.replace(/\/+$/, "") || "/";
    const reduceMotion = useReducedMotion(true);
    const theme = useMantineTheme();
    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: " + theme.breakpoints.md + ")");
        const closeOnDesktop = (event: MediaQueryListEvent) => {
            if (event.matches) setOpen(false);
        };

        desktopQuery.addEventListener("change", closeOnDesktop);
        return () => desktopQuery.removeEventListener("change", closeOnDesktop);
    }, [theme.breakpoints.md]);

    return (
        <>
            <Burger
                hiddenFrom="md"
                opened={open}
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-navigation-drawer"
                color="white"
                className="mobile-nav-trigger"
            />

            <Drawer
                opened={open}
                onClose={() => setOpen(false)}
                id="mobile-navigation-drawer"
                position="right"
                title="Menú"
                overlayProps={{ backgroundOpacity: 0.75, blur: 3 }}
                aria-label="Navegación móvil"
                closeButtonProps={{ "aria-label": "Cerrar menú" }}
                classNames={{
                    content: "mobile-drawer-content",
                    header: "mobile-drawer-header",
                    title: "mobile-drawer-title",
                    close: "mobile-drawer-close",
                    body: "mobile-drawer-body",
                    inner: "mobile-drawer-inner",
                }}
                transitionProps={{ duration: reduceMotion ? 0 : 200 }}
            >
                <nav aria-label="Navegación móvil" className="mobile-drawer-nav">
                    <Stack gap="sm">
                        {items.map((item) => (
                            <Button
                                key={item.href}
                                component={Link}
                                href={item.href}
                                aria-current={currentPath === item.href.replace(/\/+$/, "") ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                variant="subtle"
                                color="gray"
                                justify="flex-start"
                                size="md"
                                className="mobile-menu-link"
                            >
                                <span className="mobile-menu-label">
                                    <span className="mobile-menu-terminal" aria-hidden="true" />
                                    <span>{item.name}</span>
                                </span>
                            </Button>
                        ))}
                    </Stack>
                </nav>
            </Drawer>
        </>
    );
}
