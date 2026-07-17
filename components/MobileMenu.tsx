"use client";

import { Burger, Button, Drawer, Stack } from "@mantine/core";
import { useState } from "react";

type NavItem = { name: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Burger
                hiddenFrom="md"
                opened={open}
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                color="white"
            />

            <Drawer
                opened={open}
                onClose={() => setOpen(false)}
                position="right"
                title="Menú"
                hiddenFrom="md"
                overlayProps={{ backgroundOpacity: 0.75, blur: 3 }}
            >
                <Stack gap="xs">
                    {items.map((item) => (
                        <Button
                            key={item.href}
                            component="a"
                            href={item.href}
                            onClick={() => setOpen(false)}
                            variant="subtle"
                            color="gray"
                            justify="flex-start"
                            size="md"
                        >
                            {item.name}
                        </Button>
                    ))}
                </Stack>
            </Drawer>
        </>
    );
}
