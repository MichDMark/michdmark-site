import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
    return (
        <div className={cn("mb-8 flex flex-col gap-2", className)}>
            <h2 className="text-2xl font-heading font-bold text-white">{title}</h2>
            {description && <p className="text-zinc-400">{description}</p>}
        </div>
    );
}
