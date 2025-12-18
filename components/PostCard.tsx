import Link from "next/link";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Post } from "@/lib/posts";
import { MoveRight } from "lucide-react";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const formattedDate = format(parseISO(post.date), "d MMM yyyy", { locale: es }); // ej: 20 mar 2024

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="
        group relative flex flex-col gap-3 rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]/70
        p-6
        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        backdrop-blur
        hover:bg-[var(--surface)]/85
        hover:border-white/15
        transition
      "
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="
                rounded-full border border-white/10 bg-white/5
                px-2.5 py-1
                text-[11px] font-medium
                text-[var(--accent)]
                font-mono
              "
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Date */}
                <time
                    dateTime={post.date}
                    className="shrink-0 text-[11px] text-[var(--muted2)] font-mono capitalize"
                >
                    {formattedDate}
                </time>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                {post.description}
            </p>

            {/* CTA */}
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text)]/90 group-hover:text-[var(--text)] transition">
                Leer artículo
                <MoveRight className="w-4 h-4" />
            </div>

            {/* Subtle hover glow */}
            <div
                className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition
          [background:radial-gradient(600px_circle_at_20%_0%,rgba(225,29,72,0.10),transparent_45%)]
        "
            />
        </Link>
    );
}