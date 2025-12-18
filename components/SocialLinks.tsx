import { socialLinks } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    group?: "social" | "contact";
}

export function SocialLinks({
    className,
    iconSize = 20,
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
                        className="text-zinc-400 hover:text-brand-red transition-colors"
                        title={link.name}
                    >
                        <Icon size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
}