"use client";

import { Burger, Button, Drawer, Stack } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { name: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const currentPath = pathname.replace(/\/+$/, "") || "/";
    const reduceMotion = useReducedMotion(true);

    return (
        <>
            <Burger
                hiddenFrom="md"
                opened={open}
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                color="white"
                className="mobile-nav-trigger"
            />

            <Drawer
                opened={open}
                onClose={() => setOpen(false)}
                position="right"
                title="Menú"
                hiddenFrom="md"
                overlayProps={{ backgroundOpacity: 0.75, blur: 3 }}
                aria-label="Navegación móvil"
                transitionProps={{ duration: reduceMotion ? 0 : 200 }}
            >
                <Stack gap="xs">
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
                            {item.name}
                        </Button>
                    ))}
                </Stack>
            </Drawer>
        </>
    );
}
