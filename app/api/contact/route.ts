import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const isLikelyWorkersEnv = typeof process === "undefined" || !("versions" in process) || !(process as any).versions?.node;
    if (isLikelyWorkersEnv) {
      return NextResponse.json(
        {
          error:
            "SMTP is not available on Cloudflare Pages runtime. Use Zoho Mail HTTP API or another email API. See README.",
        },
        { status: 501 }
      );
    }

    const host = process.env.ZOHO_SMTP_HOST || "smtp.zoho.com";
    const port = Number(process.env.ZOHO_SMTP_PORT || 465);
    const secure = String(process.env.ZOHO_SMTP_SECURE || "true") === "true";
    const user = process.env.ZOHO_SMTP_USER;
    const pass = process.env.ZOHO_SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    if (!user || !pass || !to) {
      return NextResponse.json(
        { error: "SMTP environment variables are not set. See .env.example" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
      to,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br/>")}</p>\n             <hr/>\n             <p>From: ${name} &lt;${email}&gt;</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
