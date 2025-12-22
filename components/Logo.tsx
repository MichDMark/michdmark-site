"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <Link
            href="/"
            aria-label="Ir al inicio"
            title="Ir al inicio"
            className={cn(
                `
        group inline-flex items-center gap-2
        rounded-xl border border-white/10
        bg-white/5 px-3 py-2
        text-white
        shadow-[0_10px_30px_-22px_rgba(0,0,0,0.6)]
        hover:bg-white/8 hover:border-white/15
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35
        transition
        `,
                className
            )}
        >
            <span className="text-lg sm:text-xl font-heading font-bold tracking-tight">
                Mich <span className="text-white/70 group-hover:text-white transition">DMark</span>
            </span>


        </Link>
    );
}