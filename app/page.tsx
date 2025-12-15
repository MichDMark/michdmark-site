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
    <div className="flex flex-col gap-24 py-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
              Developer. <span className="text-brand-red">Creator.</span><br />
              Builder.
            </h1>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              I'm Mich, a developer passionate about building digital products that live on the internet.
              I write code, design interfaces, and share what I learn along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href="/projects"
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
              >
                View Work
              </Link>
              <SocialLinks className="px-2" />
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white font-heading">Últimos artículos</h2>
            <Link href="/blog" className="text-sm text-brand-red hover:text-white transition-colors flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 className="text-2xl font-bold text-white font-heading">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-brand-red hover:text-white transition-colors flex items-center gap-1">
              All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">Stay Updated</h2>
            <p className="text-zinc-400 mb-8">
              Join the newsletter to receive updates on my latest projects and articles.
              No spam, ever.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
