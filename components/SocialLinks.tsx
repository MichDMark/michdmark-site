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
                        className="
  inline-flex items-center justify-center
  h-10 w-10 rounded-xl
  text-zinc-400
  bg-white/0
  hover:bg-white/5 hover:text-brand-red
  hover:scale-[1.06]
  active:scale-[0.98]
  transition
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-brand-red/40
"
                        title={link.name}
                    >
                        <Icon size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
}