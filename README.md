# Mich's Portfolio & Blog

A modern, minimal portfolio and blog template built with Next.js 14+, Tailwind CSS, and TypeScript.

## Features

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS.
- **Design**: Minimalist dark-themed aesthetic with red accents.
- **Blog**: Markdown-based blog with static generation (`/content/posts`).
- **Data Management**: Simple TypeScript data files for Gadgets and Projects (`/data`).
- **Performance**: Optimized with Next.js features (Font optimization, Image optimization).

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) with your browser.

## Customization

### Adding a Blog Post
1. Create a new `.md` file in `content/posts/`.
2. Add the required frontmatter:
   ```yaml
   ---
   title: "Your Title"
   date: "YYYY-MM-DD"
   description: "Short description"
   tags: ["Tag1", "Tag2"]
   ---
   ```
3. Write your content in Markdown.

### Managing Projects & Gadgets
- **Projects**: Edit `data/projects.ts` to add or remove projects.
- **Gadgets / Setup**: Edit `data/gadgets.ts`.
- **Social Links**: Edit `data/social.ts`.

### Newsletter
The newsletter form in `app/newsletter/page.tsx` is currently a mock. Integration with providers like Mailchimp or ConvertKit can be added in the `handleSubmit` function.

## Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
