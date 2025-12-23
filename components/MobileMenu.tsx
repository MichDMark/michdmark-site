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
                className="
          md:hidden inline-flex items-center justify-center
          rounded-xl border border-white/10
          bg-white/5 px-3 py-2
          text-sm text-white/90
          hover:bg-white/10
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35
          transition
        "
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
                <div className="md:hidden fixed inset-0 z-[60] flex justify-end">
                    {/* Overlay */}
                    <button
                        aria-label="Cerrar menú"
                        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel wrapper aligned right */}
                    <div className="relative z-10 mt-16 mr-4 w-72 max-w-[calc(100vw-2rem)]">
                        <div
                            className="
                relative
                rounded-2xl border border-white/10
                bg-[#0b0f14]
                shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]
                overflow-hidden
                origin-top-right
              "
                        >
                            {/* Base tint (para que no transparente nada) */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-black/70"
                            />

                            {/* Degradado de marca (sutil) */}
                            <div
                                aria-hidden
                                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(180deg,rgba(225,29,72,0.16),rgba(15,23,42,0.96))]
                "
                            />

                            {/* Glow superior (sutil) */}
                            <div
                                aria-hidden
                                className="
                  pointer-events-none absolute inset-0
                  bg-[radial-gradient(80%_60%_at_50%_0%,rgba(225,29,72,0.12),transparent_72%)]
                "
                            />

                            <div className="relative z-10 p-3">
                                {items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="
                      block rounded-xl
                      px-4 py-4
                      text-base font-semibold text-white/90
                      hover:bg-white/5 active:bg-white/10
                      transition
                    "
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="relative z-10 border-t border-white/10 p-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="
                    w-full rounded-xl
                    border border-white/10 bg-black/20
                    px-4 py-3
                    text-sm font-semibold text-white/80
                    hover:bg-white/5 hover:text-white
                    transition
                  "
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}