import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/content/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please fill every field with a valid email." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Honest: no silent fake-success. Wire RESEND_API_KEY + CONTACT_TO to deliver.
    return NextResponse.json(
      { error: "Email isn't wired up yet. Please reach me at " + PERSONAL_INFO.email + "." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || PERSONAL_INFO.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Delivery failed. Please email me directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
