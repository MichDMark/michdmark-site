import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
    title: "Contact | Mich",
    description: "Get in touch.",
};

export default function ContactPage() {
    return (
        <Container className="py-24 max-w-2xl">
            <SectionHeader
                title="Contact"
                description="Let's build something together."
                className="mb-12"
            />

            <div className="grid gap-12 md:grid-cols-2">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                    <p className="text-zinc-400 mb-8">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Socials</h4>
                        <SocialLinks className="flex-wrap" />
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Email Me</h3>
                    <a
                        href="mailto:hello@example.com"
                        className="text-brand-red text-xl font-medium hover:underline break-all"
                    >
                        hello@example.com
                    </a>
                    <p className="text-zinc-500 text-sm mt-4">
                        Response time: usually within 24-48 hours.
                    </p>
                </div>
            </div>
        </Container>
    );
}
