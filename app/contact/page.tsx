"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any)?.error || "Unable to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="How can I help?"
            rows={6}
            required
          />
        </div>
        <Button disabled={status === "loading"} type="submit">
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && (
          <p className="text-green-600 text-sm">Message sent! I’ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm">Error: {error}</p>
        )}
      </form>

      <p className="text-xs text-gray-500 mt-4">
        Note for Cloudflare Pages: direct SMTP is not supported on Cloudflare’s runtime. The form
        fully works locally and on Node-based hosts. See README for Cloudflare-friendly options.
      </p>
    </section>
  );
}
