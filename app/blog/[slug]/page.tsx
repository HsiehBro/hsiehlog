import { getAllPosts, getPostBySlug } from "@/lib/md";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.meta.title ?? "Post",
    description: post?.meta.description ?? "",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose max-w-none">
      <h1>{post.meta.title}</h1>
      {post.meta.date && <p className="text-sm text-gray-500">{post.meta.date}</p>}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
