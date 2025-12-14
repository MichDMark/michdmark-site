import { Github, Globe } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 hover:border-brand-red/50 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <div className="flex gap-2">
                    {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                            <Globe size={20} />
                        </a>
                    )}
                </div>
            </div>
            <p className="text-sm text-zinc-400 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-300 border border-white/10">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
