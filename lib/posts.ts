import fs from "fs";
import path from "path";
import YAML from "yaml";

const postsDirectory = path.join(process.cwd(), "content/posts");

export const postKinds = ["experimento", "ensayo", "guia", "nota-rapida"] as const;
export type PostKind = (typeof postKinds)[number];

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    kind?: PostKind;
    signals?: string[];
    relatedProjects?: string[];
    relatedGadgets?: string[];
}

function invalidFrontmatter(fileName: string, message: string): never {
    throw new Error(`Frontmatter inválido en ${fileName}: ${message}`);
}

function requiredString(data: Record<string, unknown>, field: string, fileName: string): string {
    const value = data[field];
    if (typeof value !== "string" || value.trim().length === 0) {
        invalidFrontmatter(fileName, `el campo "${field}" debe ser un texto no vacío`);
    }
    return value;
}

function optionalStringArray(data: Record<string, unknown>, field: string, fileName: string): string[] | undefined {
    if (!Object.hasOwn(data, field)) {
        return undefined;
    }

    const value = data[field];
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
        invalidFrontmatter(fileName, `el campo "${field}" debe ser una lista de textos no vacíos`);
    }

    return value;
}

function optionalPostKind(data: Record<string, unknown>, fileName: string): PostKind | undefined {
    if (!Object.hasOwn(data, "kind")) {
        return undefined;
    }

    const value = data.kind;
    if (typeof value !== "string" || !postKinds.includes(value as PostKind)) {
        invalidFrontmatter(
            fileName,
            `el campo "kind" debe ser uno de: ${postKinds.join(", ")}`,
        );
    }

    return value as PostKind;
}

function isValidIsoDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    if (month < 1 || month > 12) {
        return false;
    }

    const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysByMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day >= 1 && day <= daysByMonth[month - 1];
}

function parsePost(fileName: string, slug: string, source: string): Post {
    const opening = /^---\r?\n/.exec(source);
    if (!opening) {
        invalidFrontmatter(fileName, "se esperaba un delimitador --- al inicio del archivo");
    }

    const closingPattern = /^---[ \t]*\r?$/gm;
    closingPattern.lastIndex = opening[0].length;
    const closing = closingPattern.exec(source);
    if (!closing) {
        invalidFrontmatter(fileName, "falta el delimitador de cierre ---");
    }

    let contentStart = closing.index + closing[0].length;
    if (source[contentStart] === "\n") {
        contentStart += 1;
    }

    let data: unknown;
    try {
        data = YAML.parse(source.slice(opening[0].length, closing.index), {
            schema: "core",
            version: "1.2",
        });
    } catch (error) {
        const detail = error instanceof Error ? error.message : "error YAML desconocido";
        invalidFrontmatter(fileName, detail);
    }

    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        invalidFrontmatter(fileName, "se esperaba un mapa YAML de campos de post");
    }

    const fields = data as Record<string, unknown>;
    const title = requiredString(fields, "title", fileName);
    const description = requiredString(fields, "description", fileName);
    const date = requiredString(fields, "date", fileName);
    if (!isValidIsoDate(date)) {
        invalidFrontmatter(fileName, 'el campo "date" debe ser una fecha real con formato YYYY-MM-DD');
    }

    const tags = optionalStringArray(fields, "tags", fileName) ?? [];
    const kind = optionalPostKind(fields, fileName);
    const signals = optionalStringArray(fields, "signals", fileName);
    const relatedProjects = optionalStringArray(fields, "relatedProjects", fileName);
    const relatedGadgets = optionalStringArray(fields, "relatedGadgets", fileName);

    return {
        slug,
        title,
        date,
        description,
        tags,
        content: source.slice(contentStart),
        ...(kind ? { kind } : {}),
        ...(signals ? { signals } : {}),
        ...(relatedProjects ? { relatedProjects } : {}),
        ...(relatedGadgets ? { relatedGadgets } : {}),
    };
}

function resolvePostPath(slug: string, directory: string): string | null {
    if (
        typeof slug !== "string" ||
        slug.length === 0 ||
        slug === "." ||
        slug === ".." ||
        slug.includes("/") ||
        slug.includes("\\") ||
        path.isAbsolute(slug)
    ) {
        return null;
    }

    const root = path.resolve(directory);
    const fullPath = path.resolve(root, `${slug}.md`);
    const relativePath = path.relative(root, fullPath);
    if (relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
        return null;
    }

    return fullPath;
}

export function getAllPosts(directory = postsDirectory): Post[] {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const fileNames = fs
        .readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => entry.name);
    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(directory, fileName);
        return parsePost(fullPath, slug, fs.readFileSync(fullPath, "utf8"));
    });

    return allPosts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPostBySlug(slug: string, directory = postsDirectory): Post | null {
    const fullPath = resolvePostPath(slug, directory);
    if (!fullPath || !fs.existsSync(fullPath)) {
        return null;
    }

    return parsePost(fullPath, slug, fs.readFileSync(fullPath, "utf8"));
}
