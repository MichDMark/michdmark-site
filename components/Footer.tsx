import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-zinc-400">
                        © {new Date().getFullYear()} Mich. All rights reserved.
                    </span>
                </div>
                <SocialLinks />
            </Container>
        </footer>
    );
}
