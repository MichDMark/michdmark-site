"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { name: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);

    // Cerrar con ESC
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    // Cerrar al dar click fuera
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (!open) return;
            if (!panelRef.current) return;
            if (panelRef.current.contains(e.target as Node)) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    return (
        <div className="relative md:hidden">
            <button
                type="button"
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            >
                <span className="sr-only">Menú</span>
                <div className="grid gap-1">
                    <span className="block h-0.5 w-5 bg-white/80" />
                    <span className="block h-0.5 w-5 bg-white/80" />
                    <span className="block h-0.5 w-5 bg-white/80" />
                </div>
            </button>

            {open && (
                <div
                    ref={panelRef}
                    className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-background/95 backdrop-blur-md shadow-xl"
                >
                    <div className="p-2">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/10 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}