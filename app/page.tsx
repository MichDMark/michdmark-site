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

            <div
              className="
              mt-8
              max-w-2xl
              rounded-3xl
              border border-white/12
              bg-[linear-gradient(180deg,rgba(225,29,72,0.22),rgba(0,0,0,0.6))]
              p-6 sm:p-8
              backdrop-blur
              "
            >
              <p className="text-lg sm:text-xl text-white leading-relaxed">
                Soy Mich, bienvenido a mi espacio. Funciono mejor después de un par de tazas de café.
              </p>

              <p className="mt-4 text-lg sm:text-xl text-white/85 leading-relaxed">
                Aquí encontrarás mi blog, proyectos y los gadgets que uso en mi día a día.
              </p>
            </div>

            {/* Redes (con color ambiental) */}
            <div className="mt-10 mb-8 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              {/* glow de marca */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-80
                  [background:radial-gradient(650px_circle_at_50%_0%,rgba(225,29,72,0.22),transparent_60%)]
                "
              />

              <div className="relative z-10 grid gap-4 sm:grid-cols-2">

                {/* Grupo 1: Redes */}
                <div className="rounded-xl border border-white/15 bg-black/20 p-4 hover:border-[rgba(225,29,72,0.35)] transition">
                  <h3 className="mb-4 text-base font-semibold tracking-wide text-white">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Links a mis redes
                  </h3>
                  <SocialLinks group="social" className="gap-2" />
                </div>

                {/* Grupo 2: Contacto */}
                <div className="rounded-xl border border-white/15 bg-black/20 p-4 hover:border-[rgba(225,29,72,0.35)] transition">
                  <h3 className="mb-4 text-base font-semibold tracking-wide text-white">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Contáctame
                  </h3>
                  <SocialLinks group="contact" className="gap-2" />
                </div>

              </div>
            </div>

            {/* Botones */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  rounded-xl
                  font-bold
                  text-white
                  border border-white/10
                  bg-[linear-gradient(135deg,rgba(225,29,72,0.28),rgba(255,255,255,0.06))]
                  shadow-[0_10px_30px_-18px_rgba(225,29,72,0.55)]
                  hover:shadow-[0_18px_40px_-18px_rgba(225,29,72,0.65)]
                  hover:border-white/15
                  transition
                "
              >
                Leer el blog
              </Link>

              <Link
                href="/setup"
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  rounded-xl
                  font-bold
                  text-white
                  border border-[rgba(225,29,72,0.28)]
                  bg-[linear-gradient(135deg,rgba(225,29,72,0.12),rgba(255,255,255,0.04))]
                  shadow-[0_10px_30px_-18px_rgba(225,29,72,0.25)]
                  hover:border-[rgba(225,29,72,0.45)]
                  hover:shadow-[0_18px_40px_-18px_rgba(225,29,72,0.35)]
                  transition
                "
              >
                Ver mi setup
              </Link>
            </div>
          </div>
        </Container>
      </section>


    </div>
  );
}