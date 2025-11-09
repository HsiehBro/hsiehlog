import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          HsiehLog
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
          <a href="/rss.xml" aria-label="RSS feed">RSS</a>
        </nav>
      </div>
    </header>
  );
}
