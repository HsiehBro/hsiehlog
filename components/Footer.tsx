export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} HsiehLog</p>
        <p>Built with Next.js, Tailwind, and shadcn/ui</p>
      </div>
    </footer>
  );
}
