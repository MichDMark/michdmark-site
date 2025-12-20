import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialLinks } from "@/components/SocialLinks";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const latestProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 py-10 md:py-14">
      {/* Hero Section */}
      <section className="pt-6 pb-10 sm:pt-10 sm:pb-16">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
              Desarrollador.{" "}
              <span className="text-brand-red">Creador de Contenido.</span>
              <br />
              Maker.
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl">
              Soy Mich, bienvenido a mi espacio, funciono mejor después de un par de tazas de café.
              <span className="block mt-2">
                Aquí encontrarás mi blog, proyectos y los gadgets que uso en mi día a día.
              </span>
            </p>

            {/* Redes primero */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <SocialLinks group="social" className="gap-2" />
              </div>
              <div className="flex items-center gap-3">
                <SocialLinks group="contact" className="gap-2" />
              </div>
            </div>

            {/* Botón después */}
            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Ver Proyectos
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white font-heading">
              Últimos artículos
            </h2>
            <Link
              href="/blog"
              className="text-sm text-brand-red hover:text-white transition-colors flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Preview */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white font-heading">
              Proyectos destacados
            </h2>
            <Link
              href="/projects"
              className="text-sm text-brand-red hover:text-white transition-colors flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}