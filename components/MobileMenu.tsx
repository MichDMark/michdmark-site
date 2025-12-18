"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = { name: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);

    // Close on ESC + lock scroll when open
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("keydown", onKeyDown);

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Button */}
            <button
                type="button"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            >
                <span className="sr-only">Menú</span>
                <div className="grid gap-1">
                    <span className="block h-0.5 w-5 bg-white/80" />
                    <span className="block h-0.5 w-5 bg-white/80" />
                    <span className="block h-0.5 w-5 bg-white/80" />
                </div>
            </button>

            {/* Overlay + Panel */}
            {open && (
                <div className="md:hidden fixed inset-0 z-[60]">
                    {/* Overlay */}
                    <button
                        aria-label="Cerrar menú"
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel */}
                    <div
                        className="
              absolute right-4 top-20
              w-[min(320px,calc(100vw-2rem))]
              rounded-2xl border border-white/10
              bg-[var(--surface)]/95
              shadow-2xl
              overflow-hidden
            "
                    >
                        <div className="p-2">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-sm font-medium text-white/85 hover:bg-white/10 transition"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="border-t border-white/10 p-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-full rounded-xl bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}