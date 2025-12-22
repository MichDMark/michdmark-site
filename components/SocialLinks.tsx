import { socialLinks } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    group?: "social" | "contact";
}

export function SocialLinks({
    className,
    iconSize = 24,
    group,
}: SocialLinksProps) {
    const links = group
        ? socialLinks.filter((link) => link.group === group)
        : socialLinks;

    return (
        <div className={cn("flex items-center gap-4", className)}>
            {links.map((link) => {
                const Icon = link.icon;

                return (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        title={link.name}
                        className={cn(
                            `
              inline-flex items-center justify-center
              h-10 w-10 rounded-xl
              text-zinc-200
              bg-black/10
              hover:bg-white/5
              hover:text-[var(--accent)]
              transition
              active:scale-[0.97]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40
              `,
                            // 🔹 pequeño matiz según grupo
                            group === "social" && "hover:shadow-[0_0_0_1px_rgba(225,29,72,0.35)]",
                            group === "contact" && "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                        )}
                    >
                        <Icon size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
}