import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostMeta = {
  title: string;
  description?: string;
  date?: string;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  html: string;
};

export async function getAllPosts(): Promise<Array<{ slug: string; meta: PostMeta }>> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const file = await fs.readFile(filePath, "utf8");
      const { data } = matter(file);
      return {
        slug,
        meta: {
          title: (data as any).title ?? slug,
          description: (data as any).description ?? "",
          date: (data as any).date ?? "",
        },
      };
    })
  );

  return posts.sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);

    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    return {
      slug,
      meta: {
        title: (data as any).title ?? slug,
        description: (data as any).description ?? "",
        date: (data as any).date ?? "",
      },
      html: contentHtml,
    };
  } catch {
    return null;
  }
}
