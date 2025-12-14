import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
    className?: string;
}

export function AvatarPlaceholder({ className }: AvatarPlaceholderProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-500",
                className
            )}
        >
            <User className="w-1/2 h-1/2" />
        </div>
    );
}
