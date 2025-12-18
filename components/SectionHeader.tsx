import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export function SectionHeader({
    title,
    description,
    className,
}: SectionHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col gap-3",
                "mb-6 md:mb-10",
                className
            )}
        >
            <h2
                className="
          text-2xl md:text-3xl
          font-heading font-bold
          text-[var(--text)]
          tracking-tight
        "
            >
                {title}
            </h2>

            {description && (
                <p
                    className="
            max-w-2xl
            text-sm md:text-base
            leading-relaxed
            text-[var(--muted)]
          "
                >
                    {description}
                </p>
            )}
        </header>
    );
}