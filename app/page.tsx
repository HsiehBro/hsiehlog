import { getAllPosts } from "@/lib/md";
import { PostCard } from "@/components/PostCard";

export const dynamic = "force-static";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
