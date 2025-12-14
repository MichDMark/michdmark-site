import { socialLinks } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
}

export function SocialLinks({ className, iconSize = 20 }: SocialLinksProps) {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
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
