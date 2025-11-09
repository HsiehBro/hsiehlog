import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/md";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const now = new Date().toISOString();

  const posts = await getAllPosts();

  const postUrls = posts.map((p) => ({
    url: `${site}/blog/${p.slug}`,
    lastModified: p.meta.date || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${site}/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...postUrls,
  ];
}
