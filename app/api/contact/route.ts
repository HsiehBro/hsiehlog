import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    // Edge Runtime doesn't support Node.js modules like nodemailer
    // Return a 501 error indicating SMTP is not available
    // For production, implement an HTTPS email API (Resend, Mailgun, etc.)
    return NextResponse.json(
      {
        error:
          "SMTP is not available on Cloudflare Pages Edge Runtime. Please use an HTTPS email API (Resend, Mailgun, Zoho Mail API, etc.). See README for implementation details.",
      },
      { status: 501 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
