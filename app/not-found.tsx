export default function NotFoundPage() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold">404 — Page not found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="inline-block mt-6 text-blue-600">Go back home</a>
    </section>
  );
}
