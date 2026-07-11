import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
    title: "Sobre mí | Mich",
    description: "Más sobre Mich.",
    alternates: {
        canonical: "/about/",
    },
};

export default function AboutPage() {
    return (
        <Container className="py-24 max-w-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                    <AvatarPlaceholder className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900" />
                </div>
                <div>
                    <SectionHeader title="Sobre mí" className="mb-6" />
                    <div className="prose prose-invert text-zinc-400">
                        <p className="mb-4">
                            Soy Mich, Ingeniero Electrónico con Maestría en Mecatrónica, pero de alguna manera la vida me ha llevado a muchos caminos diferentes que hoy comparto en este sitio.
                        </p>
                        <p className="mb-4">
                            Me dedico al desarrollo de software, la creación de contenido, amante de un buen café de especialidad y en mis ratos libres jugar TCG y escuchar Podcasts.
                        </p>
                        <p>
                            &ldquo;No sé a dónde nos lleva este camino, pero definitivamente es un lugar diferente.&rdquo;
                        </p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contacto</h3>
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </Container>
    );
}
