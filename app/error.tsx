"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-gray-600">{error.message || "Unexpected error."}</p>
      <button onClick={reset} className="inline-block mt-6 text-blue-600">
        Try again
      </button>
    </section>
  );
}
