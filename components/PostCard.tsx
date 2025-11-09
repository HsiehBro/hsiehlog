import Link from "next/link";

type PostCardProps = {
  post: {
    slug: string;
    meta: {
      title: string;
      description?: string;
      date?: string;
    };
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border rounded-lg p-4 hover:shadow-sm transition"
    >
      <h2 className="text-xl font-semibold">{post.meta.title}</h2>
      {post.meta.date && (
        <p className="text-xs text-gray-500 mt-1">{post.meta.date}</p>
      )}
      {post.meta.description && (
        <p className="text-sm text-gray-700 mt-2">{post.meta.description}</p>
      )}
      <span className="inline-block mt-3 text-blue-600">Read more →</span>
    </Link>
  );
}
