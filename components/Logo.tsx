import { LucideCommand } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-red p-1 rounded-lg group-hover:bg-red-600 transition-colors">
                <LucideCommand className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">Mich</span>
        </Link>
    );
}
