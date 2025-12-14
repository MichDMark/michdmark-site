import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Setup", href: "/setup" },
    { name: "About", href: "/about" },
    { name: "Newsletter", href: "/newsletter" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                <Logo />
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                {/* Mobile Nav Placeholder (Simple link group for now) */}
                <nav className="flex md:hidden items-center gap-4 overflow-x-auto">
                    {/* Simplified for mobile for now, or just show Logo */}
                </nav>
            </Container>
        </header>
    );
}
