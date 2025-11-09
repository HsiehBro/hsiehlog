import { getAllPosts, getPostBySlug } from "@/lib/md";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  
  // During build, Next.js runs on Node.js and can access files
  // The @cloudflare/next-on-pages adapter should handle making this work
  const posts = await getAllPosts();

  const items = await Promise.all(
    posts.map(async (p) => {
      const full = await getPostBySlug(p.slug);
      const title = escapeXml(p.meta.title || p.slug);
      const description = escapeXml(p.meta.description || "");
      const link = `${site}/blog/${p.slug}`;
      const pubDate = p.meta.date ? new Date(p.meta.date).toUTCString() : new Date().toUTCString();
      
      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
          ${full?.html ? `<content:encoded><![CDATA[${full.html}]]></content:encoded>` : ""}
        </item>
      `;
    })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>HsiehLog</title>
    <link>${site}</link>
    <description>A beginner-friendly static blog built with Next.js</description>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
