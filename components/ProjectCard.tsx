
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 hover:border-brand-red/50 hover:bg-white/10 transition-colors">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">{project.name}</h3>

                {project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-brand-red hover:text-white transition-colors"
                    >
                        Visitar sitio →
                    </a>
                )}
            </div>
            <p className="text-sm text-zinc-400 flex-1">{project.description}</p>
            {project.stack?.length ? (
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-300 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
