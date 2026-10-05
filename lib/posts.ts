import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
}

export function getAllPosts(directory = postsDirectory): Post[] {
    // Ensure directory exists
    if (!fs.existsSync(directory)) {
        return [];
    }

    const fileNames = fs.readdirSync(directory).filter((fileName) => fileName.endsWith(".md"));
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date, // Keep as ISO string
            description: data.description,
            tags: data.tags || [],
            content,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string, directory = postsDirectory): Post | null {
    const fullPath = path.join(directory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        content,
    };
}
