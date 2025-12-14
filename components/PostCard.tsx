import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "@/lib/posts";
import { MoveRight } from "lucide-react";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-6 hover:border-brand-red/50 hover:bg-white/10 transition-colors"
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-brand-red font-mono">
                            #{tag}
                        </span>
                    ))}
                </div>
                <time dateTime={post.date} className="text-xs text-zinc-500 font-mono">
                    {format(parseISO(post.date), "MMM d, yyyy")}
                </time>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-red transition-colors">
                {post.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">
                {post.description}
            </p>
            <div className="mt-auto pt-4 flex items-center text-xs font-bold text-white uppercase tracking-wider group-hover:gap-2 transition-all">
                Read Post <MoveRight className="w-4 h-4 ml-1" />
            </div>
        </Link>
    );
}
