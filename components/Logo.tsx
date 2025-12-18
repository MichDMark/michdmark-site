import Link from "next/link";

export function Logo() {
    return (
        <Link
            href="/"
            className="
        group flex items-center gap-2
        font-heading font-bold
        tracking-tight
      "
        >
            {/* Icono (si ya existe, déjalo igual) */}
            <span className="text-white/90">
                ⌘
            </span>

            {/* Nombre */}
            <span
                className="
          text-base
          text-white
          group-hover:text-brand-red
          transition-colors
        "
            >
                Mich DMark
            </span>
        </Link>
    );
}