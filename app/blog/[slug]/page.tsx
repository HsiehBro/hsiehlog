// ✅ 新增这个 interface
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

import { getAllPosts, getPostBySlug } from "@/lib/md";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ✅ 注意：这里要 `await params`
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.meta.title ?? "Post",
    description: post?.meta.description ?? "",
  };
}

// ✅ 同样这里
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose max-w-none">
      <h1>{post.meta.title}</h1>
      {post.meta.date && <p className="text-sm text-gray-500">{post.meta.date}</p>}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
