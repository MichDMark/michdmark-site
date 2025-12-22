import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Setup", href: "/setup" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between py-1">
                <Logo className="-mx-1" />

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

                <MobileMenu items={navItems} />
            </Container>
        </header>
    );
}